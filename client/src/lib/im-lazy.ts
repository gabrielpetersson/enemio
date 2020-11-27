export const gebi = (id: string) => document.getElementById(id)
export const dqsa = (query: string) =>
  Array.from(document.querySelectorAll(query)) as HTMLElement[]
export const dqs = (query: string) =>
  document.querySelector(query) as HTMLElement | null
