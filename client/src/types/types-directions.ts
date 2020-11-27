export enum Directions {
  up = 0,
  upRight = 1,
  right = 2,
  downRight = 3,
  down = 4,
  downLeft = 5,
  left = 6,
  upLeft = 7,
  still = 8
}
export const isDirectionYAxis = (direction: Directions) =>
  [0, 2].includes(direction)

export const isDirectionXAxis = (direction: Directions) =>
  [1, 3].includes(direction)

export const directionIsPositive = (direction: Directions) =>
  [1, 2].includes(direction)

export const directionIsNegative = (direction: Directions) =>
  [0, 3].includes(direction)

export const getRandomDirection = () => Math.floor(Math.random() * 4)
export const getAxis = (direction: Directions) =>
  direction % 2 === 0 ? "x" : "y"
export const getOppositeAxis = (direction: Directions) =>
  direction % 2 === 0 ? "y" : "x"
