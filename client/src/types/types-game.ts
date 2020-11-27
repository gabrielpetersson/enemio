import { IPlayer } from "./types-player"

export interface IGame {
  localPlayerId: string
  localPlayer: IPlayer | null
  remotePlayers: IPlayer[]
  gameIsLoading: boolean
}
