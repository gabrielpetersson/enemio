import { textChangeRangeIsUnchanged } from "typescript"
import { Game } from "../game"
import { PlayerKeyBinding } from "../key-binding"
import {
  BetterElement,
  BetterEvents
} from "../lib/okay-react-has-some-good-parts"
import { KeyMappingTypes } from "../types/types-button-mapping"

type StartScreenElementNames =
  | "newKeyOverlay"
  | "changeBindingText"
  | "changeBindingButton"
  | "enterNameInput"
  | "startGameButton"
  | "startGameLoader"
  | "startScreen"
  | "bindingButtonUp"
  | "bindingButtonDown"
  | "bindingButtonLeft"
  | "bindingButtonRight"
  | "bindingButtonShoot"

// TODO: probably refactor to get elements on demand instead of in contrsuctor?
export class StartScreenComponent {
  keyBinding: PlayerKeyBinding
  name: string
  changeKeyMapping: KeyMappingTypes | null
  els: Record<StartScreenElementNames, BetterElement>
  documentEvents: BetterEvents
  game: Game
  isOpen: boolean
  constructor(keyBinding: PlayerKeyBinding, game: Game) {
    this.game = game
    this.keyBinding = keyBinding
    this.name = ""

    this.changeKeyMapping = null
    this.isOpen = false

    this.els = {
      newKeyOverlay: new BetterElement("#change-binding-overlay", {
        hidden: true,
        visibleDisplay: "flex"
      }),
      changeBindingText: new BetterElement("#change-binding-text"),
      changeBindingButton: new BetterElement(".change-binding-button.change"),
      enterNameInput: new BetterElement("#enter-name-input"),
      startGameButton: new BetterElement("#start-game-button"),
      startGameLoader: new BetterElement("#start-game-loader"),
      startScreen: new BetterElement("#start-screen-container"),
      bindingButtonUp: new BetterElement(".change-binding-button.up"),
      bindingButtonDown: new BetterElement(".change-binding-button.down"),
      bindingButtonLeft: new BetterElement(".change-binding-button.left"),
      bindingButtonRight: new BetterElement(".change-binding-button.right"),
      bindingButtonShoot: new BetterElement(".change-binding-button.shoot")
    }
    this.updateBindingButtons()
    this.documentEvents = new BetterEvents(document)
    this.els.startScreen.hide()
    this.els.enterNameInput.element?.focus()
  }
  private updateBindingButton = (button: BetterElement, text: string) =>
    button.insertText(text === " " ? "Space" : text)
  private updateBindingButtons = () => {
    this.updateBindingButton(
      this.els.bindingButtonUp,
      this.keyBinding[KeyMappingTypes.up]
    )
    this.updateBindingButton(
      this.els.bindingButtonDown,
      this.keyBinding[KeyMappingTypes.down]
    )
    this.updateBindingButton(
      this.els.bindingButtonLeft,
      this.keyBinding[KeyMappingTypes.left]
    )
    this.updateBindingButton(
      this.els.bindingButtonRight,
      this.keyBinding[KeyMappingTypes.right]
    )
    this.updateBindingButton(
      this.els.bindingButtonShoot,
      this.keyBinding[KeyMappingTypes.shoot]
    )
  }

  private stopChangeKeyBindingListeners = () => {
    this.documentEvents.removeListener("keydown")
    this.documentEvents.removeListener("click")
  }

  private onKeyDownNewBinding = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (
      !this.changeKeyMapping ||
      e.key === "Enter" ||
      e.key === "Escape" ||
      e.key === "Alt"
    ) {
      this.closeChangeBindingPrompt()
      return
    }
    this.updateKeyBinding(this.changeKeyMapping, e.key)
    this.updateBindingButtons()
  }

  private updateKeyBinding = (keyMapping: KeyMappingTypes, newKey: string) => {
    if (!this.changeKeyMapping) return
    this.els.changeBindingText.insertText(this.changeKeyMapping)
    this.keyBinding.setKeyBinding[keyMapping](newKey)
    this.updateBindingButton(
      this.els.changeBindingButton,
      this.keyBinding.keyBindings[this.changeKeyMapping]
    )
  }

  private openChangeBindingPrompt = async (
    changeKey: KeyMappingTypes,
    e: Event
  ) => {
    e.stopImmediatePropagation()
    this.changeKeyMapping = changeKey
    this.documentEvents.addListener("keydown", this.onKeyDownNewBinding)
    this.documentEvents.addListener("click", this.closeChangeBindingPrompt)
    this.els.changeBindingText.insertText(changeKey)
    this.updateBindingButton(
      this.els.changeBindingButton,
      this.keyBinding.keyBindings[this.changeKeyMapping]
    )
    this.els.newKeyOverlay.show()
  }

  private closeChangeBindingPrompt = () => {
    this.els.newKeyOverlay.hide()
    this.changeKeyMapping = null
    this.stopChangeKeyBindingListeners()
    this.els.enterNameInput.element?.focus()
  }

  private stopListeners = () => {
    Object.keys(this.els).map(k =>
      this.els[k as StartScreenElementNames].removeAllListeners()
    )
  }

  private onNameChange = (e: InputEvent) => {
    if (!(e.target && (e.target as HTMLInputElement).value.length > 16))
      this.name = (e.target as HTMLInputElement).value
    this.els.enterNameInput.setValue(this.name)
  }

  private onStartGame = () => {
    if (!this.name.length) return
    this.els.startGameButton.hide()
    this.els.startGameLoader.show()
    this.game.addLocalPlayer(this.name)
  }

  private onClickStartScreen = (e: Event) => {
    if (!e.target) return
    if (e.target === e.currentTarget) this.els.enterNameInput.element?.focus()
  }

  private setupListeners = () => {
    this.els.newKeyOverlay.addListener("click", this.closeChangeBindingPrompt)
    this.els.enterNameInput.addListener("input", this.onNameChange)
    this.els.startGameButton.addListener("click", this.onStartGame)
    this.els.startScreen.addListener("click", this.onClickStartScreen)

    this.els.bindingButtonUp.addListener("click", e =>
      this.openChangeBindingPrompt(KeyMappingTypes.up, e)
    )
    this.els.bindingButtonDown.addListener("click", e =>
      this.openChangeBindingPrompt(KeyMappingTypes.down, e)
    )
    this.els.bindingButtonLeft.addListener("click", e =>
      this.openChangeBindingPrompt(KeyMappingTypes.left, e)
    )
    this.els.bindingButtonRight.addListener("click", e =>
      this.openChangeBindingPrompt(KeyMappingTypes.right, e)
    ),
      this.els.bindingButtonShoot.addListener("click", e =>
        this.openChangeBindingPrompt(KeyMappingTypes.shoot, e)
      )
  }

  public close = () => {
    if (!this.isOpen) return
    this.isOpen = false
    this.stopListeners()
    this.changeKeyMapping = null
    this.els.startScreen.hide()
  }

  public open = () => {
    if (!this.els.startScreen || this.isOpen) return
    this.isOpen = true
    this.els.startScreen.show()
    this.setupListeners()
    this.els.enterNameInput.element?.focus()
  }
}
