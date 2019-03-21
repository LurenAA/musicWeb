import { warn } from '../util/debug'
import ease from '../util/ease'
import momentum from '../util/mometum'

export function initCoreMethods (MinScroll) {
  MinScroll.prototype._start = function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (!this.enable) {
      return
    }
    this._initiated = true
    this._transitionTime()
    this.startTime = +new Date()

    this.stop()

    let point = e.touches[0]

    this.startX = this.x
    // this.startY = this.y
    this.pointX = point.pageX
    // this.pointY = point.pageY
    this.moved = false
    this.distX = 0

    this.trigger('beforeScrollStart')
  }

  MinScroll.prototype._move = function (e) {
    if (!this.enable || !this._initiated) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    let point = e.touches[0]

    let deltaX = point.pageX - this.pointX
    this.pointX = point.pageX
    this.distX += deltaX

    let timeStamp = +new Date()
    if (Math.abs(this.distX) < 15 && timeStamp - this.startTime && !this.moved) {
      console.log('_move: a small change')
      return
    }
    this.moved = true

    // let newX = deltaX > 15 ? this.x + deltaX : this.x
    let newX = this.x + deltaX
    // let newY = deltaY > 15 ? this.y + deltaY : this.y
    if (newX > this.minScrollX || newX < this.maxScrollX) {
      newX = this.x + deltaX / 3
    }
    // console.log(newX)
    // if (newY < this.minScrollY || newY > this.maxScrollY) {
    //   newY = this.y + deltaY / 3
    // }
    if (this._initiated) {
      this.trigger('scrollStart')
    }

    this._translate(newX, this.y)

    let scrollLeft = document.documentElement.scrollLeft || window.pageXOffset

    let pX = this.pointX - scrollLeft
    if (pX > document.documentElement.clientWidth - 15 || pX < 15) {
      this._end(e)
    }
  }

  MinScroll.prototype._end = function (e) {
    if (!this.enable || !this._initiated) {
      return
    }
    this._initiated = false
    e.preventDefault()
    e.stopPropagation()
    this.isInTransition = false
    this.trigger('touchEnd', {
      x: this.x,
      y: this.y
    })
    if (this.resetPosition(300, ease.bounce)) {
      return
    }
    let endTime = +new Date()
    if (this._events.flick && endTime - this.startTime < 300 && Math.abs(this.x - this.startX) < 30) {
      this.trigger('flick')
      return
    }

    let time = 0
    let newX = this.x
    if (endTime - this.startTime < 1000 && Math.abs(this.x - this.startX) < 200) {
      let momentumX = momentum(this.x, this.startX, endTime - this.startTime, this.minScrollX, this.maxScrollX, this.wrapperWidth)
      time = momentumX.duration
      newX = momentumX.des
      this.isInTransition = true
    }
    this.scrollto(newX, this.y, time, ease.swipe)
  }

  MinScroll.prototype._transitionTime = function (time = 0) {
    this.scroller.style['transitionDuration'] = time + 'ms'
  }

  MinScroll.prototype._translate = function (x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      warn('from _translate: x or y is not number ')
    }
    this.scroller.style.transform = `translate(${x}px,${y}px) ${this.translateZ}`
    this.x = x
    this.y = y
  }

  MinScroll.prototype.stop = function () {
    this.isInTransition = false
    let pos = this.getComputedPos()
    this._translate(pos.x, pos.y)
    this.trigger('scrollEnd', {
      x: this.x,
      y: this.y
    })
  }

  MinScroll.prototype.getComputedPos = function () {
    let matrix = window.getComputedStyle(this.scroller, null)['transform']
    let x
    let y

    matrix = matrix.split(')')[0].split(', ')
    x = isNaN(+matrix[4]) ? 0 : +matrix[4]
    y = isNaN(+matrix[5]) ? 0 : +matrix[5]
    return {
      x, y
    }
  }

  MinScroll.prototype.resetPosition = function (time = 0, easeing = ease.bounce) {
    let x = this.x
    if (this.x > this.minScrollX) {
      x = this.minScrollX
    } else if (this.x < this.maxScrollX) {
      x = this.maxScrollX
    } else {
      return false
    }
    this.scrollto(x, this.y, time, easeing)
    // this._translate(x, this.y)
    return true
  }

  MinScroll.prototype.scrollto = function (x, y, time = 0, easing = ease.bounce) {
    this._transitionTime(time)
    this._transitionTimeFunc(easing.style)
    this._translate(x, y)
  }

  MinScroll.prototype._transitionTimeFunc = function (ease) {
    this.scroller.style['transitionTimingFunction'] = ease
  }

  MinScroll.prototype._transitionEnd = function (e) {
    if (e.target !== this.scroller || !this.isInTransition) {
      return
    }

    this._transitionTime()
    this.resetPosition(500, ease.bounce)
    this.isInTransition = false
  }
}
