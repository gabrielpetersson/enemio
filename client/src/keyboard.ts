import { IPressedKeys } from "./types/types-keyboard"

export class Keyboard {
  pressedKeys: IPressedKeys
  private onKeyPress: (pressedKeys: IPressedKeys) => void
  private onKeyUp: (pressedKeys: IPressedKeys) => void
  private onNoKeyPressed: () => void
  constructor({
    onKeyPress,
    onKeyUp,
    onNoKeyPressed
  }: {
    onKeyPress: (pressedKeys: IPressedKeys) => void
    onKeyUp: (pressedKeys: IPressedKeys) => void
    onNoKeyPressed: () => void
  }) {
    this.pressedKeys = {}
    this.onKeyUp = onKeyUp
    this.onKeyPress = onKeyPress
    this.onNoKeyPressed = onNoKeyPressed
    this.startKeyboard()
  }
  _onKeyPress = (e: KeyboardEvent) => {
    if (this.pressedKeys[e.key]) return
    this.pressedKeys = { ...this.pressedKeys, [e.key]: Date.now() }
    this.onKeyPress(this.pressedKeys)
  }

  _onKeyUp = (e: KeyboardEvent) => {
    const { [e.key]: id, ...rest } = this.pressedKeys
    this.pressedKeys = rest
    if (!Object.keys(this.pressedKeys).length) this.onNoKeyPressed()
    else this.onKeyUp(this.pressedKeys)
  }
  startKeyboard = () => {
    window.addEventListener("keydown", this._onKeyPress, true)
    window.addEventListener("keyup", this._onKeyUp, true)
  }
  stopKeyboard = () => {
    window.removeEventListener("keydown", this._onKeyPress, true)
    window.removeEventListener("keyup", this._onKeyUp, true)
  }
}
