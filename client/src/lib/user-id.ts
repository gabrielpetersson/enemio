export const getUserId = () => localStorage.xcs
export const generateAndGetUserId = () => {
  const newID = Date.now().toString().slice(4, -1)
  localStorage.setItem("xcs", newID)
  return newID
}
