export function checkAbility (x) {
  if (x in document.documentElement.style) {
    return true
  } else {
    return false
  }
}
