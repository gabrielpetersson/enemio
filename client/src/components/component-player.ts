import loadTemplate from "../lib/load-template"

export class PlayerComponent {
  playerEl: HTMLDivElement | null
  playerHpEl: HTMLDivElement | null
  playerGunEl: HTMLDivElement | null
  playerNameEl: HTMLDivElement | null
  playerBodyEl: HTMLDivElement | null
  playerBulletEl: HTMLDivElement | null
  playerKillsEl: HTMLDivElement | null
  constructor() {
    this.playerEl = loadTemplate("player-template") as HTMLDivElement
    this.playerHpEl = this.playerEl.querySelector("player-hp")
    this.playerNameEl = this.playerEl.querySelector("player-name")
    this.playerGunEl = this.playerEl.querySelector("player-gun")
    this.playerBodyEl = this.playerEl.querySelector("player-body")
    this.playerBulletEl = this.playerEl.querySelector("player-body")
    this.playerKillsEl = this.playerEl.querySelector("kill-display")

    document.getElementById("player-map")?.appendChild(this.playerEl)
  }
  setHp = (hp: number) => {
    if (!this.playerHpEl) return
    this.playerHpEl.style.width = hp + "%"
  }
  setName = (name: string) => {
    if (!this.playerNameEl) return
    this.playerNameEl.innerHTML = name
  }
  rotate = (deg: number) => {
    if (!this.playerBodyEl) return
    this.playerBodyEl.style.transform = `rotate(${deg}deg)`
  }
  move = (offsetLeft: number, offsetTop: number) => {
    if (!this.playerEl) return
    this.playerEl.style.transform = `translate(${offsetLeft * 8}px, ${
      offsetTop * 8
    }px)`
  }
  setKills = (kills: number) => {
    if (!this.playerKillsEl) return
    this.playerKillsEl.innerHTML = kills.toString()
  }
  setShowBullet = (showBullet: boolean) => {
    if (!this.playerBulletEl) return
    if (showBullet) this.playerBulletEl.style.opacity = "1"
    else this.playerBulletEl.style.opacity = "0"
  }
}
