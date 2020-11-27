import {
  APIPlayerPosition,
  ICreatePlayer,
  INodeGame,
  ISendPosition,
  SocketMessageTypes
} from "./types/types-game-socket"

const getPlayerMessageTypePosition = (userId: string) => `p${userId}`
const getPlayerMessageTypeIsShooting = (userId: string) => `s${userId}`
const getPlayerMessageTypeHp = (userId: string) => `hp${userId}`
const getPlayerMessageTypeKills = (userId: string) => `kills${userId}`
const getPlayerMessageTypeIsDead = (userId: string) => `isDead${userId}`

const giveId = (userId: string, p: any) => ({ id: userId, p })
export type SendPayload = ISendPosition

export class GameSocket {
  socket: SocketIOClient.Socket
  constructor() {
    this.socket = io("/")
    // this.socket = io("ws://localhost:8001")
  }
  private on = (
    msgType: SocketMessageTypes | string,
    cb: (msg: any) => void
  ) => {
    console.debug("on", msgType)
    this.socket.on(msgType, (msg: any) => cb(msg))
    return () => this.socket.off(msgType, cb)
  }
  private send = (msgType: SocketMessageTypes | string, data: any) =>
    this.socket.emit(msgType, data)

  public onPlayerIsShooting = (
    userId: string,
    cb: (isShooting: boolean) => void
  ) => this.on(getPlayerMessageTypeIsShooting(userId), cb)
  public onPlayerPosition = (
    userId: string,
    cb: (position: APIPlayerPosition) => void
  ) => this.on(getPlayerMessageTypePosition(userId), cb)
  public onPlayerHp = (userId: string, cb: (hp: number) => void) =>
    this.on(getPlayerMessageTypeHp(userId), cb)
  public onPlayerKills = (userId: string, cb: (kills: number) => void) =>
    this.on(getPlayerMessageTypeKills(userId), cb)
  public onPlayerIsDead = (userId: string, cb: (isDead: boolean) => void) =>
    this.on(getPlayerMessageTypeIsDead(userId), cb)
  public onRecieveGame = (cb: (game: INodeGame) => void) =>
    this.on(SocketMessageTypes.game, cb)

  public sendPlayerPosition = (userId: string, position: APIPlayerPosition) =>
    this.send(SocketMessageTypes.position, giveId(userId, position))
  public sendPlayerHp = (userId: string, hp: number) =>
    this.send(SocketMessageTypes.hp, giveId(userId, hp))
  public sendPlayerKills = (userId: string, kills: number) =>
    this.send(SocketMessageTypes.kills, giveId(userId, kills))
  public sendPlayerIsShooting = (userId: string) =>
    this.send(SocketMessageTypes.isShooting, giveId(userId, true))
  public sendPlayerIsDead = (userId: string, isDead: boolean) =>
    this.send(SocketMessageTypes.isDead, giveId(userId, isDead))
  public playerIsShoot = (playerShooterId: string, playerDamagedId: string) => {
    this.send(SocketMessageTypes.playerIsShoot, {
      playerShooterId,
      playerDamagedId
    })
  }

  public sendPlayerJoin = (userId: string, name: string) =>
    this.send(SocketMessageTypes.playerJoin, { userId, name })
  public sendPlayerLeave = (userId: string) =>
    this.send(SocketMessageTypes.playerLeave, userId)
  public onPlayerJoin = (cb: (player: ICreatePlayer) => void) =>
    this.on(SocketMessageTypes.onNewPlayer, cb)
}
