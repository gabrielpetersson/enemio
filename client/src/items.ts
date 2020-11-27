import { PlayerPosition } from "./position"
import { gunItems } from "./types/types-gun"
import { CItem } from "./types/types-items"

const items = [...Object.values(gunItems)]
const total_rarity = items.reduce((a, b) => a + b.rarity, 0)

export class Itembox {
  position: PlayerPosition
  item: CItem
  constructor(item: CItem) {
    this.position = new PlayerPosition()
    this.item = item
  }
}

export class MapItems {
  itemBoxes: CItem[]
  constructor() {
    this.itemBoxes = []
  }
  addItemBox = () => {
    const randomNumber = Math.floor(Math.random() * total_rarity)
    let curRarity = 0
    const newItem = items.find(item => {
      curRarity += item.rarity
      if (curRarity < randomNumber) return item
    })
    if (!newItem) throw Error("Did not generate new item")
    this.itemBoxes = [...this.itemBoxes, newItem]
  }
  setupRandomSpawn = () => {
    // seftInterval(() => {}, RANDOM_ITEM_SPAWN_MS
  }
}
