import { StartScreenComponent } from "./components/component-start-screen"
import { Game } from "./game"

export class GameLoop {
  game: Game
  startScreen: StartScreenComponent
  constructor(game: Game, startScreen: StartScreenComponent) {
    this.game = game
    this.startScreen = startScreen
    window.requestAnimationFrame(this.gameLoop)
  }
  gameLoop = () => {
    if (!this.game.localPlayer && !this.startScreen.isOpen) {
      this.startScreen.open()
    } else if (this.startScreen.isOpen && this.game.localPlayer) {
      this.startScreen.close()
    }
    this.game.update()
    window.requestAnimationFrame(this.gameLoop)
  }
}
