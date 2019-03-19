export function initSnapMethods (MinScroll) {
  MinScroll.prototype._initSnap = function () {
    if (this.options.loop) {
      let children = this.scroller.children
      if (children.length > 1) {
        this.scroller.prepend(children[0].cloneNode(true))
        this.scroller.append(children[children.length - 1].cloneNode(true))
      } else {
        this.options.loop = false
      }
    }

    this.on('refresh', () => {

    })

    this.on('scrollEnd', () => {

    })

    this.on('flick', () => {

    })

    this.on('destroy', () => {

    })
  }
}
