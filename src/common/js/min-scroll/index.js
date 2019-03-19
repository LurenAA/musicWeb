import { warn } from './util/debug'
import { initMethods } from './scroll/init'
import { initSnapMethods } from './scroll/snap'
import { initEventMethods } from './scroll/event'
/* options =  {
  loop
  threshold
  speed
  HWCompositing
}
methods: scrollTo, pageTo
*/

export default class MinScroll {
  constructor (el, options) {
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
    if (!this.wrapper) {
      warn('no such el in index.js')
    }
    this.scroller = this.wrapper.children[0]
    if (!this.scroller) {
      warn('no child in wrapper')
    }
    this._init()
  }
}

initMethods(MinScroll)
initSnapMethods(MinScroll)
initEventMethods(MinScroll)
