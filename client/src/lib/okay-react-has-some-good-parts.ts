import { dqs } from "./im-lazy"

export class BetterEvents {
  element: HTMLElement | Document
  eventListeners: Record<string, (e: Event) => void>
  constructor(element: HTMLElement | Document) {
    this.element = element
    this.eventListeners = {}
  }
  // how do typescript have no type for eventName to event
  addListener = (listener: string, func: (e: any) => void) => {
    if (this.eventListeners[listener]) {
      console.warn(
        "tried to set 2 same event listeners - ## -",
        this.element,
        listener,
        func
      )
      this.removeListener(listener)
    }
    this.element?.addEventListener(listener, func)
    this.eventListeners[listener] = func
  }

  removeListener = (listener: string) =>
    this.element?.removeEventListener(listener, this.eventListeners[listener])

  removeAllListeners = () =>
    Object.entries(this.eventListeners).forEach(ent =>
      this.element?.removeEventListener(ent[0], ent[1])
    )
}

interface BetterElementOptions {
  hidden?: boolean
  visibleDisplay?: string
}
// who df invented dealing with elements in vanilla js
export class BetterElement {
  selector: string
  display?: string
  element: HTMLElement | null
  events?: BetterEvents
  opts: BetterElementOptions
  constructor(
    selector: string,
    opts: BetterElementOptions = {
      hidden: false,
      visibleDisplay: "flex"
    }
  ) {
    this.opts = opts
    this.selector = selector
    this.element = this.findElement()
    this.display = this.element?.style.display || opts.visibleDisplay
    if (this.element) this.events = new BetterEvents(this.element)
    if (opts.hidden) this.hide()
  }

  private findElement = () => dqs(this.selector)

  refresh = () => {
    if (this.element) this.events = new BetterEvents(this.element)
    this.element = this.findElement()
  }

  insertText = (text: string) => {
    const dynamicTextEl = this.element?.querySelector(".dynamic-text")
    if (!dynamicTextEl) return
    dynamicTextEl.innerHTML = text
  }

  setValue = (value: string) => {
    if (!this.element) return
    ;(this.element as HTMLInputElement).value = value
  }

  hide = () => {
    if (!this.element) return
    this.display = this.element.style.display
    this.element.style.display = "none"
  }

  show = () => {
    if (!this.element) return
    this.element.style.display =
      this.display || this.opts.visibleDisplay || "flex" // arbitrary default
  }

  addListener = (listener: string, func: (e: any) => void) =>
    this.events?.addListener(listener, func)

  removeListener = (listener: string) => this.events?.removeListener(listener)

  removeAllListeners = () => this.events?.removeAllListeners()

  removeElement = () => {
    this.events?.removeAllListeners()
    this.element?.remove()
  }
}
