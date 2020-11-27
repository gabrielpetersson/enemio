import { PlayerPosition } from "../position"
import { IGun } from "./types-gun"

export interface IPlayer {
  id: string
  position: PlayerPosition
  hp: number
  name: string
  isDead: boolean
  kills: number | undefined
  gun: IGun
  remove: () => void
  draw: () => void
}
