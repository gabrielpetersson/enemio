import { PlayerKeyBinding } from "./key-binding"
import { GameSocket } from "./game-socket"
import { LocalPlayer } from "./local-player"
import { RemotePlayer } from "./remote-player"
import { IGame } from "./types/types-game"
import { ICreatePlayer, INodeGame } from "./types/types-game-socket"
import { IPlayer } from "./types/types-player"
import { PlayerScrollMap } from "./lib/scroll"
import { PlayerComponent } from "./components/component-player"

export class Game implements IGame {
  localPlayerId: string
  localPlayer: IPlayer | null
  remotePlayers: IPlayer[]
  stopListeners: (() => void) | null
  gameIsLoading: boolean
  socket: GameSocket
  keyBinding: PlayerKeyBinding
  viewportEl: HTMLDivElement
  playerScrollMap: PlayerScrollMap | null
  constructor(
    localPlayerId: string,
    viewportEl: HTMLDivElement,
    keyBinding: PlayerKeyBinding
  ) {
    this.localPlayerId = localPlayerId
    this.viewportEl = viewportEl

    this.localPlayer = null
    this.remotePlayers = []
    this.stopListeners = null
    this.gameIsLoading = false

    this.keyBinding = keyBinding
    this.socket = new GameSocket()
    this.playerScrollMap = null

    // this.socket.sendPlayerLeave(localPlayerId)
    this.setupListeners()
  }
  removeRemotePlayer = (userId: string) =>
    (this.remotePlayers = this.remotePlayers.filter(remotePlayer => {
      if (remotePlayer.id !== userId) return true
      remotePlayer.remove()
      return false
    }))
  addRemotePlayer = (newPlayer: ICreatePlayer) =>
    newPlayer.userId !== this.localPlayerId &&
    !this.remotePlayers.map(r => r.id).includes(newPlayer.userId) &&
    this.remotePlayers.push(
      new RemotePlayer(
        newPlayer,
        () => this.removeRemotePlayer(newPlayer.userId),
        this.socket
      )
    )
  isLocalPlayer = (userId: string) => this.localPlayerId === userId
  isRemotePlayer = (userId: string) =>
    this.remotePlayers.map(r => r.id).includes(userId)
  getRemotePlayer = (userId: string) =>
    this.remotePlayers.find(r => r.id === userId)
  doesPlayerExist = (userId: string) =>
    this.isLocalPlayer(userId) || this.isRemotePlayer(userId)
  getPlayer = (userId: string) => {
    if (this.isLocalPlayer(userId)) return this.localPlayer
    else if (this.isRemotePlayer(userId)) return this.getRemotePlayer(userId)
  }
  updateOrAddPlayer = (createPlayer: ICreatePlayer) => {
    const player = this.getPlayer(createPlayer.userId)
    if (player) {
      player.hp = createPlayer.hp
      player.kills = createPlayer.kills
      player.position.setImmediatePosition({
        x: createPlayer.position.x,
        y: createPlayer.position.y
      })
      player.position.setImmediateDirection(createPlayer.position.d)
      player.hp = createPlayer.hp
    } else {
      !this.isLocalPlayer(createPlayer.userId) &&
        this.addRemotePlayer(createPlayer)
    }
  }
  isShoot = () => {
    if (!this.localPlayer?.gun.isShooting) return
    const { localPlayer, remotePlayers } = this
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
  setupListeners = () => {
    this.socket.onPlayerJoin((newPlayer: ICreatePlayer) => {
      if (newPlayer.userId === this.localPlayerId) {
        this.localPlayer?.remove() // just to make sure. cleaning up listeners etc
        this.localPlayer = new LocalPlayer(
          newPlayer,
          this.socket,
          this.keyBinding
        )
        this.playerScrollMap = new PlayerScrollMap(
          this.localPlayer,
          this.viewportEl
        )
      } else {
        this.addRemotePlayer(newPlayer)
      }
    })

    this.socket.onRecieveGame((game: INodeGame) => {
      Object.values(game).map(player => this.updateOrAddPlayer(player))
    })
  }

  endGame = () => {
    this.stopListeners?.()
  }

  addLocalPlayer = (name: string) => {
    this.socket.sendPlayerJoin(this.localPlayerId, name)
  }
  drawPlayers = () => {
    ;[
      ...(this.localPlayer ? [this.localPlayer] : []),
      ...this.remotePlayers
    ].forEach(p => {
      p.draw()
    })
  }
  update = () => {
    this.isShoot()
    this.drawPlayers()
    this.playerScrollMap?.scroll()
  }
}
