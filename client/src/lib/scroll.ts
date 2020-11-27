import {
  OUTER_WORLD_MAP_BORDER_WIDTH,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
  BOX_SIZE
} from "../constants"
import { IPlayer } from "../types/types-player"

export class PlayerScrollMap {
  player: IPlayer
  scrollOffsetX: number
  scrollOffsetY: number
  playerViewport: HTMLDivElement | null
  constructor(player: IPlayer, playerViewport: HTMLDivElement) {
    this.player = player
    this.playerViewport = playerViewport
    this.scrollOffsetY =
      OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerHeight / 2
    this.scrollOffsetX =
      OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerWidth / 2
  }

  scroll = () => {
    if (!this.playerViewport) return
    if (!this.player.position.x || !this.player.position.y) {
      this.playerViewport.scrollTop = this.scrollOffsetY + WORLD_MAP_HEIGHT / 2
      this.playerViewport.scrollLeft = this.scrollOffsetX + WORLD_MAP_WIDTH / 2
      return
    }
    this.playerViewport.scrollTop =
      this.player.position.y * BOX_SIZE + this.scrollOffsetY
    this.playerViewport.scrollLeft =
      this.player.position.x * BOX_SIZE + this.scrollOffsetX
  }

  onResize = () => {
    this.scrollOffsetY =
      OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerHeight / 2
    this.scrollOffsetX =
      OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerWidth / 2
  }
  setup = () => {
    window.addEventListener("resize", this.onResize)
  }
}
