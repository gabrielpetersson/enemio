export const GAME_UPDATE_MS = 1000 / 60

export const BOX_SIZE = 8

export const WORLD_MAP_HEIGHT = 1500
export const WORLD_MAP_WIDTH = 2500
export const OUTER_WORLD_MAP_BORDER_WIDTH = 1500
export const WORLD_MAP_BOX_WIDTH = WORLD_MAP_WIDTH / BOX_SIZE
export const WORLD_MAP_BOX_HEIGHT = WORLD_MAP_HEIGHT / BOX_SIZE

export const RUN_SPEED = GAME_UPDATE_MS / 2
export const DIAGONAL_RUN_SPEED = RUN_SPEED * Math.sqrt(2)

export const PLAYER_BODY_WIDTH = 35
export const PLAYER_BODY_HEIGHT = 18

export const N_DIRECTIONS = 8
export const DEGREE_STEP = 360 / N_DIRECTIONS

export const PLAYER_BODY_BOX_SIZE_WIDTH = PLAYER_BODY_WIDTH / BOX_SIZE
export const PLAYER_BODY_BOX_SIZE_HEIGHT = PLAYER_BODY_HEIGHT / BOX_SIZE
export const MAX_MOVEMENT_WORLD_BOX_WIDTH =
  WORLD_MAP_BOX_WIDTH - PLAYER_BODY_BOX_SIZE_WIDTH - 1
export const MAX_MOVEMENT_WORLD_BOX_HEIGHT =
  WORLD_MAP_BOX_HEIGHT - PLAYER_BODY_BOX_SIZE_HEIGHT - 1

export const MAX_HP = 100
export const IS_SHOOTING_MS = 30 //  how long to show, // TODO: fix so always one animation frame

export const RANDOM_ITEM_SPAWN_MS = 3000
export const OPTIMAL_N_ITEMS_MAP = 6

export const LOCAL_DELAY = 65
