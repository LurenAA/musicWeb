import warn from './warn'
const defaultOptions = {
  moveLimitDistance: 15,
  ifMomentum: true,
  momentumDistance: 200,
  momentumTime: 200,
  momentumDeceleration: 0.015,
  loop: false,
  threshold: 0.2,
  slider: false,
  scrollX: false,
  scrollY: false
}

export default function initMixin (MScroll) {
  MScroll.prototype._init = function (options) {
    this.options = Object.assign({}, defaultOptions) // 深坑，必须复制不能直接等于
    for (let x in options) {
      this.options[x] = options[x]
    }

    this._addInitialDom()
    this._watchTransition()
    this.x = 0
    this.y = 0

    if (this.options.slider) {
      this._initSlider()
    }
    // this._initMutationOb()
    this.refresh()

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.refresh()
        if (this.options.slider) {
          this._initPages()
          this._goToPage(this.pages[1])
        }
      }, 500)
    })
  }

  MScroll.prototype._addInitialDom = function () {
    let addDomOperation = function (type, fn, target) {
      target.addEventListener(type, fn, {passive: false})
    }
    this._handleDom(addDomOperation)
  }

  MScroll.prototype._removeInitialDom = function () {
    let removeDomOperation = function (type, fn, target) {
      target.removeEventListener(type, fn)
    }
    this._handleDom(removeDomOperation)
  }

  MScroll.prototype._handleDom = function (operation) {
    operation('touchstart', this, this.scroller)
    operation('touchmove', this, window)
    operation('touchend', this, window)
    operation('touchcancle', this, window)

    // operation('click', this, window)
    operation('transitionend', this, window)
  }

  MScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
        this._start(e)
        break
      case 'touchmove':
        this._move(e)
        break
      case 'touchend':
        this._end(e)
        break
      case 'transitionend':
        this._transitionEnd(e)
        break
      // case 'click':
      //   console.log('click2')
      //   break
      case 'touchcancle':
        console.log('touchcancle')
        break
    }
  }

  MScroll.prototype._dispatchClick = function (e) {
    let evt = new Event('click', {'bubbles': true, 'cancelable': false})
    // evt.initEvent('click', true, false)
    e.target.dispatchEvent(evt)
  }

  MScroll.prototype._watchTransition = function () {
    if (!('defineProperty' in Object)) {
      warn('do not has defineProperty')
    }
    let isInTransition = false
    Object.defineProperty(this, 'isInTransition', {
      get: function () {
        return isInTransition
      },
      set: function (newVal) {
        isInTransition = newVal
        if (newVal) {
          this.wrapper.style['pointer-events'] = 'none'
        } else {
          this.wrapper.style['pointer-events'] = 'auto'
        }
      }
    })
  }

  MScroll.prototype.refresh = function () {
    // ?dom变换更新后页面位置问题待解决
    if (this.options.scrollX) {
      let wrapperWidth = this.wrapper.offsetWidth
      let scrollerWidth = this.scroller.offsetWidth

      this.maxScrollX = wrapperWidth - scrollerWidth
      this.minScrollX = 0
    } else if (this.options.scrollY) {
      let wrapperHeight = this.wrapper.offsetHeight
      let scrollerHeight = this.scroller.offsetHeight

      let tmp = wrapperHeight - scrollerHeight
      this.maxScrollY = tmp < 0 ? tmp : 0
      this.minScrollY = 0
    }
  }

  MScroll.prototype._initMutationOb = function () {
    // 实际功能没能完成
    if (typeof MutationObserver === 'undefined') {
      console.log('no MutationObserver')
      return
    }
    let _this = this
    function obFunc (mutations, observer) {
      for (let x = 0; x < mutations.length; x++) {
        if (mutations[x].addedNodes.length !== 0 || mutations[x].removedNodes.length !== 0) {
          _this.refresh()
          if (this.options.scrollX && this.options.slider) {
            _this._initPages()
            _this._goToPage(_this.currentPage)
          }
          observer.takeRecords()
          break
        }
      }
    }
    let observer = new MutationObserver(obFunc)
    observer.observe(this.scroller, {
      childList: true,
      subtree: true,
      attributes: true
    })
  }
}
