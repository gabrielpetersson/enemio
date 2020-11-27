import {
  KeyMappingTypes,
  primaryKeybinding
} from "./types/types-button-mapping"

export class PlayerKeyBinding {
  up: string
  left: string
  right: string
  down: string
  shoot: string
  keyBindings: Record<KeyMappingTypes, string>
  setKeyBinding: Record<KeyMappingTypes, (key: string) => void>
  constructor() {
    this.up = primaryKeybinding.up
    this.down = primaryKeybinding.down
    this.right = primaryKeybinding.right
    this.left = primaryKeybinding.left
    this.shoot = primaryKeybinding.shoot

    this.setKeyBinding = {
      [KeyMappingTypes.up]: this.setMoveUp,
      [KeyMappingTypes.down]: this.setMoveDown,
      [KeyMappingTypes.left]: this.setMoveLeft,
      [KeyMappingTypes.right]: this.setMoveRight,
      [KeyMappingTypes.shoot]: this.setShoot
    }
    this.keyBindings = {
      [KeyMappingTypes.up]: this.up,
      [KeyMappingTypes.down]: this.down,
      [KeyMappingTypes.left]: this.left,
      [KeyMappingTypes.right]: this.right,
      [KeyMappingTypes.shoot]: this.shoot
    }
    this.retriveKeybindings()
  }
  setMoveUp = (newKey: string) => {
    if (newKey && !(typeof newKey === "string")) return
    this.up = newKey
    this.updateCurrentButtons()
  }
  setMoveDown = (newKey: string) => {
    if (newKey && !(typeof newKey === "string")) return
    this.down = newKey
    this.updateCurrentButtons()
  }
  setMoveRight = (newKey: string) => {
    if (newKey && !(typeof newKey === "string")) return
    this.right = newKey
    this.updateCurrentButtons()
  }
  setMoveLeft = (newKey: string) => {
    if (newKey && !(typeof newKey === "string")) return
    this.left = newKey
    this.updateCurrentButtons()
  }
  setShoot = (newKey: string) => {
    if (newKey && !(typeof newKey === "string")) return
    this.shoot = newKey
    this.updateCurrentButtons()
  }
  updateCurrentButtons = () => {
    this.keyBindings = {
      [KeyMappingTypes.up]: this.up,
      [KeyMappingTypes.down]: this.down,
      [KeyMappingTypes.left]: this.left,
      [KeyMappingTypes.right]: this.right,
      [KeyMappingTypes.shoot]: this.shoot
    }
    this.saveKeybindings()
  }
  saveKeybindings = () => {
    localStorage.setItem(KeyMappingTypes.up, this.up)
    localStorage.setItem(KeyMappingTypes.left, this.left)
    localStorage.setItem(KeyMappingTypes.right, this.right)
    localStorage.setItem(KeyMappingTypes.down, this.down)
    localStorage.setItem(KeyMappingTypes.shoot, this.shoot)
  }
  retriveKeybindings = () => {
    this.up = localStorage.getItem(KeyMappingTypes.up) || primaryKeybinding.up
    this.left =
      localStorage.getItem(KeyMappingTypes.left) || primaryKeybinding.left
    this.down =
      localStorage.getItem(KeyMappingTypes.down) || primaryKeybinding.down
    this.right =
      localStorage.getItem(KeyMappingTypes.right) || primaryKeybinding.right
    this.shoot =
      localStorage.getItem(KeyMappingTypes.shoot) || primaryKeybinding.shoot
  }
}
