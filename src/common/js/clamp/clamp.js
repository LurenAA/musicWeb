function spliceString (base) {
  return base + '...'
}

export default
class Clamp {
  constructor (options) {
    this.options = {
      useWekit: false || options.useWekit,
      clamp: options.clamp || 2
    }
  }

  bind (el) {
    if (el.lastChild.nodeType === 3) {
      this.el = el
      this.text = el.lastChild.nodeValue
      let style = window.getComputedStyle(el, null)
      let lineHeight = style.getPropertyValue('line-height')
      if (lineHeight === 'normal') {
        lineHeight = 1.2
      }
      this.maxHeight = this.options.clamp * parseFloat(lineHeight)
    } else {
      console.error('clamp need text')
    }
  }

  truncate () {
    if (this.el.clientHeight <= this.maxHeight) {
      return
    }

    if (!this.textArray) {
      this.textArray = this.text.split('')
    }
    this.textArray.pop()
    let newText = spliceString(this.textArray.join(''))
    this.el.innerHTML = newText
    return this.truncate()
  }
}
