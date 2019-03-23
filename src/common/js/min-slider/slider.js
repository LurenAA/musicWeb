export default function sliderMixin (MScroll) {
  MScroll.prototype._initSlider = function () {
    if (this.options.loop === true) {
      let children = this.scroller.children
      if (children.length === 1) {
        this.options.loop = false
      } else {
        this.scroller.prepend(children[children.length - 1].cloneNode(true))
        this.scroller.append(children[1].cloneNode(true))
      }
    }
    this.refresh()
    this._initPages()
    this.currentPage = this.options.loop ? this.pages[1] : this.pages[0]
    this._goToPage(this.currentPage)

    this.addEventListener('scrollEnd', function () {
      if (this.options.loop) {
        if (this.currentPage.pageNum === 0) {
          this._goToPage(this.pages[this.pages.length - 2], 0)
        } else if (this.currentPage.pageNum === this.pages.length - 1) {
          this._goToPage(this.pages[1], 0)
        }
      }
    })
  }

  MScroll.prototype._initPages = function () {
    this.pages = []
    let cx = this.wrapper.offsetWidth / 2
    let x = 0
    let pageNum = 0
    while (x >= this.maxScrollX) {
      this.pages.push({
        cx: x - cx,
        x: x,
        pageNum
      })
      pageNum++
      x -= this.wrapper.offsetWidth
    }
  }

  MScroll.prototype._goToPage = function (page, time = 0, ease = '') {
    if (!this.pages) {
      let nextPage = this.options.loop ? this.pages[1] : this.pages[0]
      this.scrollTo(nextPage.x, 250, 'cubic-bezier(0.165, 0.84, 0.44, 1)')
      this.currentPage = nextPage
    } else {
      this.scrollTo(page.x, time, ease)
      this.currentPage = page
    }
  }

  MScroll.prototype._nearestPage = function () {
    if (Math.abs(this.x - this.startX) < this.options.threshold * this.wrapper.offsetWidth) {
      return this.currentPage
    }
    let disDif = this.x - this.startX
    let newPage = disDif < 0 ? this.currentPage.pageNum + 1 : this.currentPage.pageNum - 1
    newPage = newPage < 0 ? 0 : newPage > this.pages.length - 1 ? this.pages.length - 1 : newPage
    return this.pages[newPage]
  }
}
