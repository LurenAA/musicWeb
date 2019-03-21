export function initSnapMethods (MinScroll) {
  MinScroll.prototype._initSnap = function () {
    if (this.options.loop) {
      let children = this.scroller.children
      if (children.length > 1) {
        this.scroller.append(children[0].cloneNode(true))
        this.scroller.prepend(children[children.length - 2].cloneNode(true))
      } else {
        this.options.loop = false
      }
    }

    this.on('refresh', function () {
      console.log('refresh')
    })

    this.on('scrollEnd', () => {

    })

    this.on('flick', () => {

    })

    this.on('destroy', () => {

    })
  }
}
