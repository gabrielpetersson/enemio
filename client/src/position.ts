import {
  LOCAL_DELAY,
  MAX_MOVEMENT_WORLD_BOX_HEIGHT,
  MAX_MOVEMENT_WORLD_BOX_WIDTH
} from "./constants"
import { Directions } from "./types/types-directions"
import { APIPlayerPosition } from "./types/types-game-socket"
import { IPos } from "./types/types-position"

export const randomWorldSpawnInitializer = () =>
  Math.min(
    MAX_MOVEMENT_WORLD_BOX_WIDTH,
    Math.max(
      Math.floor(
        Math.random() *
          Math.min(MAX_MOVEMENT_WORLD_BOX_WIDTH, MAX_MOVEMENT_WORLD_BOX_HEIGHT)
      ),
      3
    )
  )

export class PlayerPosition {
  x: number | null
  y: number | null
  localX: number | null
  localY: number | null
  isWalking: boolean
  localIsWalking: boolean
  direction: Directions
  localDirection: Directions
  constructor(position?: APIPlayerPosition, randomInitializer?: boolean) {
    this.x = position ? position.x : null
    this.y = position ? position.y : null
    this.localX = position ? position.x : null
    this.localY = position ? position.y : null
    this.localDirection = position ? position.d : 0
    this.direction = position ? position.d : 0
    this.localIsWalking = position ? position.w : false
    this.isWalking = position ? position.w : false
    if (randomInitializer) this.randomizePosition()
  }
  randomizePosition() {
    this.setPosition(() => ({
      x: randomWorldSpawnInitializer(),
      y: randomWorldSpawnInitializer()
    }))
  }
  walkOneStepTowards({ x, y }: { x: number; y: number }) {
    this.setPosition(p => ({
      x: p.x ? p.x + x : x,
      y: p.y ? p.y + y : y
    }))
  }
  setPosition(cb: (prevPosition: IPos) => IPos) {
    const newPos = cb({ x: this.localX, y: this.localY })
    const newX = Math.min(
      MAX_MOVEMENT_WORLD_BOX_WIDTH,
      Math.max(newPos.x || 0, 1)
    )
    const newY = Math.min(
      MAX_MOVEMENT_WORLD_BOX_HEIGHT,
      Math.max(newPos.y || 0, 2)
    )
    this.localX = newX
    this.localY = newY
    this.delayPosition(newX, newY)
  }
  // this does not
  setImmediatePosition(position: IPos) {
    this.localX = position.x
    this.localY = position.y
    this.x = position.x
    this.y = position.y
  }
  setIsWalking = (isWalking: boolean) => {
    this.localIsWalking = isWalking
    this.delayIsWalking(isWalking)
  }
  setImmediateIsWalking = (isWalking: boolean) => {
    this.localIsWalking = isWalking
    this.isWalking = isWalking
  }
  setDirection = (direction: Directions) => {
    this.localDirection = direction
    this.delayDirection(direction)
  }
  setImmediateDirection = (direction: Directions) => {
    this.localDirection = direction
    this.direction = direction
  }
  delayPosition = (curX: number, curY: number) =>
    setTimeout(() => {
      this.x = curX
      this.y = curY
    }, LOCAL_DELAY)
  delayIsWalking = (isWalking: boolean) =>
    setTimeout(() => {
      this.isWalking = isWalking
    }, LOCAL_DELAY)
  delayDirection = (direction: Directions) =>
    setTimeout(() => {
      this.direction = direction
    }, LOCAL_DELAY)
}
