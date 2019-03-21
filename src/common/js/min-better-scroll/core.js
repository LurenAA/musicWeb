import { getComputedPos } from './util'
export default function coreMixin (MScroll) {
  MScroll.prototype._start = function (e) {
    this.stop()
    e.preventDefault()
    e.stopPropagation()

    this.startX = this.x
    this.pointX = e.touches[0].pageX
    this._initial = true
    this.startTime = +new Date()
    this.moved = false
    this.distX = 0
  }

  MScroll.prototype._move = function (e) {
    if (!this._initial) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    let curPos = e.touches[0].pageX
    let deltaX = curPos - this.pointX
    this.pointX = curPos
    this.distX += deltaX
    if (Math.abs(this.distX) < this.options.moveLimitDistance && !this.moved) {
      return
    }
    this.moved = true

    let newX = this.x + deltaX
    if (newX > this.minScrollX || newX < this.maxScrollX) {
      newX = newX - deltaX * 2 / 3
    }
    // this.scroller.style['transition-duration'] = 0
    // this.scroller.style['transform'] = `translateX(${newX}px) translateZ(0)`
    this.scrollTo(newX)

    this.x = newX
    if (this.pointX - document.documentElement.scrollLeft < 15 || this.pointX - document.documentElement.scrollLeft > document.documentElement.clientWidth - 15) {
      this._end(e)
    }
  }

  MScroll.prototype._end = function (e) {
    e.preventDefault()
    e.stopPropagation()
    this._initial = false
    if (this.resetPosition()) {
      return
    }
    let timeDif = +new Date() - this.startTime
    // let newX
    // if (this.options.ifMomentum && timeDif < this.options.momentumTime &&
    //   Math.abs(this.x - this.startX) < this.options.momentumTime) {
    //   // newX = momentum(this.x - this.startX)
    // }
  }

  MScroll.prototype.stop = function () {
    this.isInTransition = false
    let curPos = getComputedPos(this.scroller)

    // this.scroller.style.transitionDuration = '0ms'
    // this.scroller.style['transform'] = `translateX(${curPos}px) translateZ(0)`
    this.scrollTo(curPos)
    this.x = curPos
  }

  MScroll.prototype.resetPosition = function () {
    let x = this.x
    if (x > this.minScrollX) {
      x = this.minScrollX
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX
    } else {
      return false
    }

    this.isInTransition = true
    // this.scroller.style.transitionDuration = '1500ms'
    // this.scroller.style['transition-timing-function'] = 'cubic-bezier(0,.95,.34,1.02)'
    // this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
    this.scrollTo(x, 1500, 'cubic-bezier(0,.95,.34,1.02)')
    this.isInTransition = false
    return true
  }

  MScroll.prototype.scrollTo = function (x, time = 0, cubic = '') {
    this.scroller.style.transitionDuration = `${time}ms`
    this.scroller.style['transition-timing-function'] = cubic
    this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
  }

  MScroll.prototype._transitionEnd = function (e) {
    if (e.target !== this.scroller) {
      return
    }
    // console.log(2)
    this.isInTransition = false
  }
}
