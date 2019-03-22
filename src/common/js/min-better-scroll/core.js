import { getComputedPos, momentum } from './util'
export default function coreMixin (MScroll) {
  MScroll.prototype._start = function (e) {
    // console.log(1)
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
    if (!this._initial) {
      return
    }
    // console.log('end')
    e.preventDefault()
    e.stopPropagation()
    this._initial = false
    this.isInTransition = false

    if (this.resetPosition()) {
      return
    }
    let timeDif = +new Date() - this.startTime
    let newX = this.x
    let duration = 0
    if (this.options.ifMomentum && timeDif < this.options.momentumTime &&
      Math.abs(this.x - this.startX) < this.options.momentumTime) {
      let posInfo = momentum(this.x - this.startX, timeDif, newX, this.options.momentumDeceleration, this.maxScrollX, this.minScrollX, this.wrapper.offsetWidth)
      newX = posInfo.x
      duration = posInfo.duration
    }
    // console.log(duration)
    if (newX !== this.x) {
      this.scrollTo(newX, duration, 'cubic-bezier(0.23, 1, 0.32, 1)')
    }
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
    let time = 0
    if (x > this.minScrollX) {
      time = 1000
      x = this.minScrollX
      // this.x = this.minScrollX
    } else if (x < this.maxScrollX) {
      time = 1000
      x = this.maxScrollX
      // this.x = this.maxScrollX
    } else {
      return false
    }

    // this.isInTransition = true
    // this.scroller.style.transitionDuration = '1500ms'
    // this.scroller.style['transition-timing-function'] = 'cubic-bezier(0,.95,.34,1.02)'
    // this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
    // console.log(time)

    this.scrollTo(x, time, 'cubic-bezier(0,.95,.39,.82)')
    // this.isInTransition = false
    return true
  }

  MScroll.prototype.scrollTo = function (x, time = 0, cubic = '') {
    if (!this.isInTransition && time !== 0) {
      this.isInTransition = true
    }
    // console.log(this.isInTransition, time)
    this.scroller.style.transitionDuration = `${time}ms`
    this.scroller.style['transition-timing-function'] = cubic
    this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
    this.x = x
  }

  MScroll.prototype._transitionEnd = function (e) {
    if (!this.isInTransition || e.target !== this.scroller) {
      console.log(e.target)
      return
    }
    this.isInTransition = false
    this.scroller.style.transitionDuration = '0ms'
    this.resetPosition()
  }
}
