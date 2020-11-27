import { Directions } from "./types-directions"

export interface ICreatePlayer {
  userId: string
  isShooting: boolean
  position: APIPlayerPosition
  hp: number
  isDead: boolean
  kills: number
  name: string
}

export enum SocketMessageTypes {
  playerJoin = "joinGame",
  playerLeave = "leaveGame",
  onNewPlayer = "newPlayer",
  playerIsShoot = "shoot",
  position = "p", // super frequent
  isDead = "isDead",
  hp = "hp",
  kills = "kills",
  isShooting = "isShooting",
  game = "game"
}

export interface ISendPosition {
  id: string
  p: APIPlayerPosition
}

export interface APIPlayerPosition {
  x: number | null
  y: number | null
  d: Directions
  w: boolean
}
export interface PlayerProfiles {
  [id: string]: {
    name: string
  }
}
export interface PlayerProfile {
  id: {
    name: string
  }
}
export type INodeGame = Record<string, ICreatePlayer>
