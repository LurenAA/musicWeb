export function offsetOfDocument (el) {
  let rect = el.getBoundingClientRect()
  return {
    top: rect.top + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft
  }
}
