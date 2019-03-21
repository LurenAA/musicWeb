import warn from './warn'
const defaultOptions = {
  moveLimitDistance: 15,
  ifMomentum: true,
  momentumDistance: 100,
  momentumTime: 200
}

export default function initMixin (MScroll) {
  MScroll.prototype._init = function (options) {
    this.options = defaultOptions
    for (let x in options) {
      this.options[x] = options[x]
    }

    this._addInitialDom()
    this._watchTransition()
    this.x = 0

    this.refresh()
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
    }
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
    let wrapperWidth = this.wrapper.offsetWidth
    let scrollerWidth = this.scroller.offsetWidth

    this.maxScrollX = wrapperWidth - scrollerWidth
    this.minScrollX = 0
  }
}
