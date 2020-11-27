import { IItem } from "./types-items"

export interface IGunItem extends IItem {
  damage: number
  range: number // box px
  isAutomatic: boolean
  reloadTime: number
}

export enum GunTypes {
  defaultPistol,
  uzi
}

export const defaultPistol: IGunItem = {
  name: "Pistol",
  rarity: 10000,
  damage: 10,
  range: 300,
  isAutomatic: false,
  reloadTime: 140
}

export const uzi: IGunItem = {
  rarity: 10000,
  name: "Uzi",
  damage: 3,
  range: 200,
  isAutomatic: true,
  reloadTime: 35
}

export const gunItems = {
  [GunTypes.defaultPistol]: defaultPistol,
  [GunTypes.uzi]: uzi
}

export interface IGun {
  damage: number
  shoot: () => void
  noReloadShoot: () => void
  range: number
  isReloading: boolean
  isShooting: boolean
}
