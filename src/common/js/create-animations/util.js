let prefix = (function () {
  const prefixes = ['Moz', 'O', 'webkit', 'ms']
  let checkNode = document.createElement('p')
  for (let i = 0, len = prefixes.length; i < len; i++) {
    if (checkNode.style[prefixes[i] + 'Animation'] !== undefined) {
      checkNode.remove()
      return prefixes[i]
    }
  }
  checkNode.remove()
  return ''
})()

export default function (style) {
  if (style) {
    return prefix + style.slice(0, 1).toUpperCase() + style.slice(1)
  }
  return prefix + style
}
