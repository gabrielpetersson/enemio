export const isPlayerShoot = (
  bulletBody: HTMLDivElement,
  playerBody: HTMLDivElement
) => {
  if (!bulletBody || !playerBody) return
  const rect = bulletBody.getBoundingClientRect()
  const rectSelection = playerBody.getBoundingClientRect()

  return (
    rect.top + rect.height > rectSelection.top &&
    rect.left + rect.width > rectSelection.left &&
    rect.bottom - rect.height < rectSelection.bottom &&
    rect.right - rect.width < rectSelection.right
  )
}
