import { checkAbility } from '../util/env'
import { warn } from '../util/debug'
import { offsetOfDocument } from '../util/dom'
const defaultOptions = {
  loop: true,
  threshold: 0.3,
  speed: 400,
  HWCompositing: true
}

export function initMethods (MinScroll) {
  MinScroll.prototype._init = function (options) {
    this._handleOptions(options)
    this._addDom()

    this.x = 0
    this.y = 0
    this._events = {}

    this._initSnap()
    this._watchTransition()

    this.refresh()

    this.enable()
  }

  MinScroll.prototype._handleOptions = function (options) {
    for (let x in options) {
      if (x in defaultOptions) {
        defaultOptions[x] = options[x]
      }
    }
    this.options = defaultOptions

    this.translateZ = this.options.HWCompositing ? ' translateZ(0)' : ''
    if (this.translateZ) {
      if (!checkAbility('transform')) {
        warn('no transform')
      }
    }
  }

  MinScroll.prototype._handleDomEvent = function (eventOperator) {
    eventOperator(this.wrapper, 'click', this)
    eventOperator(this.wrapper, 'touchstart', this)
    eventOperator(window, 'touchmove', this)
    eventOperator(window, 'touchcancle', this)
    eventOperator(window, 'touchend', this)
    eventOperator(window, 'transitionend', this)
  }

  MinScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
        this._start(e)
        break
      case 'touchmove':
        this._move(e)
        break
      case 'touchcancle':
        console.log('touchcancle')
        break
      case 'touchend':
        this._end(e)
        break
      case 'transitionend':
        this._transitionEnd(e)
        break
    }
  }

  MinScroll.prototype._addDom = function () {
    let eventOperator = (el, event, fn) => {
      el.addEventListener(event, fn, {passive: false})
    }
    this._handleDomEvent(eventOperator)
  }

  MinScroll.prototype._removeDom = function () {
    let eventOperator = (el, event, fn) => {
      el.removeEventListener(event, fn, {passive: false})
    }
    this._handleDomEvent(eventOperator)
  }

  MinScroll.prototype._watchTransition = function () {
    if (typeof Object.defineProperty !== 'function') {
      return
    }
    let _this = this
    let isInTransition = false
    Object.defineProperty(this, 'isInTransition', {
      get () {
        return isInTransition
      },
      set (newVal) {
        isInTransition = newVal
        if (newVal) {
          _this.scroller.style['pointer-events'] = 'none'
        } else {
          _this.scroller.style['pointer-events'] = 'auto'
        }
      }
    })
  }

  MinScroll.prototype.refresh = function () {
    if (this.wrapper.style.position === 'static') {
      warn('from refresh: wrapper do not be static')
    }
    this.wrapperWidth = this.wrapper.offsetWidth
    // this.wrapperHeight = this.wrapper.offsetHeight

    this.scrollerWidth = this.scroller.offsetWidth
    // this.scrollerHeight = this.scroller.offsetHeight

    this.relativeX = this.scroller.offsetLeft
    // this.relativeY = this.scroller.offsetTop

    this.minScrollX = 0
    // this.minScrollY = 0

    // this.maxScrollY = this.scrollerHeight - this.wrapperHeight
    this.maxScrollX = -this.scrollerWidth + this.wrapperWidth

    // 暂时只有x轴

    this.endTime = 0 // 用于记录结束事件，判断是不是flick
    this.directionX = 0// 记录方向 -1 左到右  0 没动  1 右到左
    this.wrapperOffset = offsetOfDocument(this.wrapper)

    this.trigger('refresh')
  }

  MinScroll.prototype.enable = function () {
    this.enable = true
  }

  MinScroll.prototype.disable = function () {
    this.enable = false
  }
}
