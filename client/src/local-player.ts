import { PlayerComponent } from "./components/component-player"
import { DIAGONAL_RUN_SPEED, RUN_SPEED } from "./constants"
import { GameSocket } from "./game-socket"
import { Gun } from "./gun"
import { Keyboard } from "./keyboard"
import { PlayerPosition } from "./position"
import { IKeyBinding, primaryKeybinding } from "./types/types-button-mapping"
import { Directions } from "./types/types-directions"
import { ICreatePlayer } from "./types/types-game-socket"
import { IGun } from "./types/types-gun"
import { IPressedKeys } from "./types/types-keyboard"
import { IPlayer } from "./types/types-player"

export class LocalPlayer implements IPlayer {
  id: string
  hp: number
  name: string
  isDead: boolean
  kills: number | undefined
  buttonMapping: IKeyBinding
  position: PlayerPosition
  gun: IGun
  keyboard: Keyboard
  walkIntervalId: NodeJS.Timeout | null
  lastShootId: number | null
  removeSocketListeners: (() => void) | null
  socket: GameSocket
  playerComponent: PlayerComponent
  constructor(
    player: ICreatePlayer,
    socket: GameSocket,
    buttonMapping: IKeyBinding = primaryKeybinding
  ) {
    this.id = player.userId
    this.name = player.name
    this.socket = socket
    this.buttonMapping = buttonMapping
    this.hp = player.hp
    this.isDead = player.isDead
    this.kills = player.kills

    this.lastShootId = null
    this.walkIntervalId = null
    this.removeSocketListeners = null

    // localPosition is internal position that is sent to server, actual position is not set until emitted from server
    this.position = new PlayerPosition(player.position)
    this.gun = new Gun(() => socket.sendPlayerIsShooting(this.id))
    this.keyboard = new Keyboard({
      onKeyPress: this.updateWalking,
      onKeyUp: this.updateWalking,
      onNoKeyPressed: () => {
        this.stopWalking()
        this.sendPosition()
      }
    })

    this.playerComponent = new PlayerComponent()
    this.listenToDB()
  }

  private listenToDB = () => {
    // const positionOff = this.socket.onPlayerPosition(this.id, position => {
    //   if (!position || this.isDead) return
    //   this.position.unsafeSet(position)
    //   this.direction = position.d
    // })
    // const isShootingOff = this.socket.onPlayerIsShooting(this.id, state => {
    //   state && !this.gun.isReloading && this.gun.shoot()
    // })
    const hpOff = this.socket.onPlayerHp(this.id, hp => {
      if (typeof hp !== "number") return
      this.hp = hp
    })
    const playerKillsOff = this.socket.onPlayerKills(this.id, kills => {
      if (typeof kills !== "number") return
      this.kills = kills
    })
    const isDeadOff = this.socket.onPlayerIsDead(this.id, isDead => {
      if (isDead) this.remove()
      this.isDead = isDead
    })
    const socketOffs = [
      // isShootingOff,
      hpOff,
      playerKillsOff,
      isDeadOff
      // positionOff
    ]
    this.removeSocketListeners = () =>
      socketOffs.filter(Boolean).forEach(f => f?.())
  }

  private updateWalking = (pressedKeys: IPressedKeys) => {
    const resp = this.getDirectionFromKeys(pressedKeys)
    if (!resp) return
    const { walkOneStep, walkSpeed } = resp
    this.stopWalking()
    this.position.setIsWalking(true)
    this.sendPosition()
    walkOneStep()
    this.walkIntervalId = setInterval(() => {
      walkOneStep()
    }, walkSpeed)
  }

  private getDirectionFromKeys = (
    pressedKeys: IPressedKeys,
    opts?: { onlyUpdateDirection?: boolean }
  ): { walkOneStep: () => void; walkSpeed: number } | void => {
    let directions = [] as number[]
    Object.keys(pressedKeys).forEach(b => {
      if (b === this.buttonMapping.up) directions.push(Directions.up)
      else if (b === this.buttonMapping.down) directions.push(Directions.down)
      else if (b === this.buttonMapping.left) directions.push(Directions.left)
      else if (b === this.buttonMapping.right) directions.push(Directions.right)
      else if (b === this.buttonMapping.shoot) {
        if (pressedKeys[b] !== this.lastShootId) {
          this.lastShootId = pressedKeys[b]
          this.gun.shoot()
        }
      }
    })
    if (!directions.length) {
      this.stopWalking()
      this.sendPosition()
      return
    }
    // player might hold more than 2 buttons, take most recent and combine it with its closest neighbour
    if (directions.length > 2) {
      const mostRecent = directions.sort((a, b) =>
        pressedKeys[a] >= pressedKeys[b] ? 1 : 0
      )[0]
      directions = directions
        .sort((a, b) =>
          Math.abs(mostRecent - a) >= Math.abs(mostRecent - b) ? 1 : 0
        )
        .slice(0, 2)
    }
    let valueOfDirections = directions.reduce((a, b) => a + b)
    if (
      valueOfDirections === 6 &&
      directions.includes(Directions.left) &&
      directions.length === 2
    )
      valueOfDirections = 14 // handling that up can both be 0 and 360 degrees
    const direction = valueOfDirections / directions.length
    const diagonal = direction % 2 !== 0
    this.position.setDirection(direction)
    if (opts?.onlyUpdateDirection) return
    return {
      walkOneStep: () =>
        this.position.walkOneStepTowards(this.getStep(directions)),
      walkSpeed: diagonal ? DIAGONAL_RUN_SPEED : RUN_SPEED
    }
  }
  getStep = (directions: number[]): { x: number; y: number } => {
    return directions.reduce(
      (moveStep: { x: number; y: number }, d: number) => {
        if (0 === d) return { ...moveStep, y: -1 }
        if (4 === d) return { ...moveStep, y: 1 }
        if (2 === d) return { ...moveStep, x: 1 }
        if (6 === d) return { ...moveStep, x: -1 }
        return moveStep
      },
      { x: 0, y: 0 }
    )
  }
  private stopWalking = () => {
    this.position.setIsWalking(false)
    this.walkIntervalId && clearInterval(this.walkIntervalId)
  }
  private sendPosition = () => {
    this.socket.sendPlayerPosition(this.id, {
      x: this.position.localX,
      y: this.position.localY,
      d: this.position.localDirection,
      w: this.position.localIsWalking
    })
  }
  public remove = () => {
    this.removeSocketListeners?.()
    this.keyboard.stopKeyboard()
    this.stopWalking()
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
