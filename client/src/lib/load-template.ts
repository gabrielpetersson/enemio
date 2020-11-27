export default (templateId: string) => {
  const template = document
    .getElementById(templateId)
    ?.cloneNode(true) as HTMLElement
  if (!template) return null
  template.id = ""
  template.removeAttribute("style")
  return template
}
