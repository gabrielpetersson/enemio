import { Game } from "./game"
import { PlayerScrollMap } from "./lib/scroll"
import { getUserId, generateAndGetUserId } from "./lib/user-id"
import { StartScreenComponent } from "./components/component-start-screen"
import { PlayerKeyBinding } from "./key-binding"
import { GameLoop } from "./game-loop"

const startGame = (game: Game) => {
  if (!game.localPlayer) return

  const isShoot = () => {
    if (!game || !game.localPlayer?.gun.isShooting) return
    // const { localPlayer, remotePlayers } = game
    // const localBullet = bulletElements.current[localPlayer.id]
    // if (!localBullet) return
    // const asyncCheckBulletHit = async () => {
    //   remotePlayers.forEach(remotePlayer => {
    //     if (remotePlayer.isDead || remotePlayer.hp <= 0) return
    //     const remoteDude = playerElements.current[remotePlayer.id]
    //     if (!isPlayerShoot(localBullet, remoteDude)) return
    //     // use this insted of calculating hp directly to not risk using old data
    //     game.socket.playerIsShoot(localPlayer.id, remotePlayer.id)
    //   })
    // }
    // asyncCheckBulletHit()
  }

  const loop = () => {
    isShoot()
  }

  const animationId = window.requestAnimationFrame(loop)
}

const setup = () => {
  console.log("runnig")
  const localPlayerId = getUserId() || generateAndGetUserId()
  const viewportEl = document.getElementById(
    "player-viewport"
  ) as HTMLDivElement

  const keyBinding = new PlayerKeyBinding()
  const game = new Game(localPlayerId, viewportEl, keyBinding)
  const startScreen = new StartScreenComponent(keyBinding, game)
  new GameLoop(game, startScreen)

  startGame(game)
}

setup()
