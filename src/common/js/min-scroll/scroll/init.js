import { checkAbility } from '../util/env'
import { warn } from '../util/debug'
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
    eventOperator(window, 'touchstart', this)
    eventOperator(window, 'touchmove', this)
    eventOperator(window, 'touchcancle', this)
    eventOperator(window, 'touchend', this)
  }

  MinScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
        console.log(e)
        break
      case 'touchmove':
        console.log(e)
        break
      case 'touchcancle':
        console.log(e)
        break
      case 'touchend':
        console.log(e)
        break
    }
  }

  MinScroll.prototype._addDom = function () {
    let eventOperator = (el, event, fn) => {
      el.addEventListener(event, fn)
    }
    this._handleDomEvent(eventOperator)
  }

  MinScroll.prototype._removeDom = function () {
    let eventOperator = (el, event, fn) => {
      el.removeEventListener(event, fn)
    }
    this._handleDomEvent(eventOperator)
  }

  MinScroll.prototype._watchTransition = function () {
    if (typeof Object.defineProperty !== 'function') {
      return
    }
    let _this = this
  }
}
