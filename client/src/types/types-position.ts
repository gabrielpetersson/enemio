export interface IPos {
  x: number | null
  y: number | null
}

export interface IPlayerPosition {
  x: number | null
  y: number | null
  randomizePosition: () => void
  walkOneStep: (changes: { x: 0; y: 0 }) => void
  setPosition: (
    cb: (p: { x: number | null; y: number | null }) => IPlayerPosition
  ) => void
}
