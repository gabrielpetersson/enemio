export interface IKeyBinding {
  up: string
  left: string
  right: string
  down: string
  shoot: string
}
export enum KeyMappingTypes {
  up = "up",
  left = "left",
  down = "down",
  right = "right",
  shoot = "shoot"
}
export const primaryKeybinding = {
  up: "w",
  left: "a",
  right: "d",
  down: "s",
  shoot: " "
} as IKeyBinding

export const secondaryKeyBinding = {
  up: "ArrowUp",
  left: "ArrowLeft",
  right: "ArrowRight",
  down: "ArrowDown",
  shoot: "."
} as IKeyBinding
