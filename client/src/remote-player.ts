import { PlayerComponent } from "./components/component-player"
import { GameSocket } from "./game-socket"
import { Gun } from "./gun"
import { PlayerPosition } from "./position"
import { APIPlayerPosition, ICreatePlayer } from "./types/types-game-socket"
import { IGun } from "./types/types-gun"
import { IPlayer } from "./types/types-player"

export class RemotePlayer implements IPlayer {
  id: string
  hp: number
  name: string
  position: PlayerPosition
  isDead: boolean
  kills: number | undefined
  gun: IGun
  socket: GameSocket
  removeSocketListeners: (() => void) | null
  removeSelf: () => void
  playerComponent: PlayerComponent
  constructor(
    player: ICreatePlayer,
    removeSelf: () => void,
    socket: GameSocket
  ) {
    this.id = player.userId
    this.hp = player.hp
    this.name = player.name
    this.isDead = player.isDead
    this.kills = player.kills
    this.removeSelf = removeSelf
    this.removeSocketListeners = null

    this.gun = new Gun()
    this.position = new PlayerPosition(player.position)

    this.socket = socket

    // super hack to rerender after new value.
    // TODO: refactor to a hook
    // db.onPlayerPosition(this.id, position => {
    //   if (!position || this.isDead) return
    //   this.position.unsafeSet(position)
    //   this.direction = position.d
    // })
    this.playerComponent = new PlayerComponent()
    this.setupSocketListeners()
  }
  setupSocketListeners = () => {
    const positionOff = this.socket.onPlayerPosition(
      this.id,
      (position: APIPlayerPosition) => {
        if (!position || this.isDead) return
        this.position.setImmediatePosition(position)
        this.position.setImmediateDirection(position.d)
        this.position.setImmediateIsWalking(position.w)
      }
    )
    const hpOff = this.socket.onPlayerHp(this.id, hp => {
      if (typeof hp !== "number") return
      this.hp = hp
    })
    const killsOff = this.socket.onPlayerKills(this.id, kills => {
      if (typeof kills !== "number") return
      this.kills = kills
    })
    const isDeadOff = this.socket.onPlayerIsDead(this.id, isDead => {
      if (isDead) {
        this.remove()
        this.removeSelf()
      }
      this.isDead = isDead
    })
    const isShootingOff = this.socket.onPlayerIsShooting(
      this.id,
      isShooting => {
        isShooting && !this.gun.isReloading && this.gun.noReloadShoot()
      }
    )
    const socketOffs = [positionOff, hpOff, killsOff, isDeadOff, isShootingOff]
    this.removeSocketListeners = () =>
      socketOffs.filter(Boolean).forEach(f => f?.())
  }
  remove = () => {
    this.removeSocketListeners?.()
  }
  public draw = () => {
    this.playerComponent.rotate(45 * (this.position.direction || 0))
    this.kills && this.playerComponent.setKills(this.kills)
    this.playerComponent.setName(this.name)
    this.playerComponent.setHp(this.hp)
    this.playerComponent.setShowBullet(this.gun.isShooting)
    this.position.x &&
      this.position.y &&
      this.playerComponent.move(this.position.x, this.position.y)
    this.playerComponent
  }
}
