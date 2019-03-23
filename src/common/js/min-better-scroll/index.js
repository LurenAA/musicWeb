import warn from './warn'
import initMixin from './init'
import coreMixin from './core'
import sliderMixin from './slider'
import eventMixin from './event'
/*
options:{
  moveLimitDistance: 15  最小拖动距离，防止误触'
  ifMomentum  是否开启惯性
  momentumDistance   开启惯性滑动的限制最大长度与时间
  momentumTime
  momentumDeceleration
  loop
  threshold
}
*/

export default class MScroll {
  constructor (el, options) {
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
    if (!this.wrapper) {
      warn('el is not a element')
    }
    this.scroller = this.wrapper.children[0]
    if (!this.scroller) {
      warn('el must has one child')
    }

    this._init(options)
  }
}

initMixin(MScroll)
coreMixin(MScroll)
sliderMixin(MScroll)
eventMixin(MScroll)
