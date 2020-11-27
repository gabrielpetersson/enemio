import { IS_SHOOTING_MS } from "./constants"
import { IGun, gunItems, GunTypes } from "./types/types-gun"

export class Gun implements IGun {
  onShoot?: () => void
  isShooting: boolean
  isReloading: boolean
  damage: number
  range: number
  isAutomatic: boolean
  reloadTime: number
  constructor(onShoot?: () => void, type: GunTypes = GunTypes.defaultPistol) {
    this.onShoot = onShoot
    this.isReloading = false
    this.isShooting = false
    this.damage = gunItems[type].damage
    this.range = gunItems[type].range
    this.isAutomatic = gunItems[type].isAutomatic
    this.reloadTime = gunItems[type].reloadTime
  }
  shoot() {
    if (this.isReloading || this.isShooting) return
    this.isShooting = true
    this.isReloading = true
    this.onShoot?.()
    this.reload()
    setTimeout(() => {
      this.isShooting = false
    }, IS_SHOOTING_MS)
    // } else {
    //   setInterval(() => {
    //     this.isShooting = true
    //     setTimeout(() => {
    //       this.isShooting = false
    //       this.reload()
    //     }, IS_SHOOTING_MS)
    //   }, this.isReloading)
    // }
  }
  // for remote players etc when recieving singal to shoot
  noReloadShoot() {
    this.isShooting = true
    this.onShoot?.()
    setTimeout(() => {
      this.isShooting = false
      this.reload()
    }, IS_SHOOTING_MS)
  }
  reload() {
    this.isReloading = true
    setTimeout(() => {
      this.isReloading = false
    }, this.reloadTime)
  }
}
