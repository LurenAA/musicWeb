import { getComputedPos, momentum } from './util'
export default function coreMixin (MScroll) {
  MScroll.prototype._start = function (e) {
    // console.log(1)
    if (!this.able) {
      return
    }
    this.stop()
    e.preventDefault()
    // e.stopPropagation()

    this.startX = this.x
    this.startY = this.y

    this.pointX = e.touches[0].pageX
    this.pointY = e.touches[0].pageY

    this._initial = true
    this.startTime = +new Date()
    this.moved = false
    this.distX = 0
    this.distY = 0
  }

  MScroll.prototype._move = function (e) {
    if (!this._initial || !this.able) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    this.trigger('moving')
    if (this.options.scrollX) {
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
    } else if (this.options.scrollY) {
      let curPos = e.touches[0].pageY
      let deltaY = curPos - this.pointY
      this.pointY = curPos
      this.distY += deltaY
      if (Math.abs(this.distY) < this.options.moveLimitDistance && !this.moved) {
        return
      }
      this.moved = true

      let newY = this.y + deltaY
      if (newY > this.minScrollY || newY < this.maxScrollY) {
        newY = this.y + deltaY / 6
      }

      this.scrollTo(newY, 0, '', true)
      this.y = newY
      let limit = this.wrapper.offsetHeight / 6
      if (newY > this.minScrollY + limit || newY < this.maxScrollY - limit) {
        this._end(e)
      }
      // console.log(this.y)
    }
  }

  MScroll.prototype._end = function (e) {
    if (!this._initial || !this.able) {
      return
    }
    // console.log('end')
    e.preventDefault()
    e.stopPropagation()
    this._initial = false
    this.isInTransition = false
    let timeDif = +new Date() - this.startTime
    if (Math.abs(this.x - this.startX) < 3 && Math.abs(this.y - this.startY) < 3 && timeDif < 100) {
      // console.log('click')
      this._dispatchClick(e)
      return
    }

    let flag = !!(this.y - this.startY)
    if (this.resetPosition(flag)) {
      return
    }

    let newPos = flag ? this.y : this.x
    let dis = flag ? this.y - this.startY : this.x - this.startX
    let duration = 0
    let ease = ''
    let maxScroll = flag ? this.maxScrollY : this.maxScrollX
    let minScroll = flag ? this.minScrollY : this.minScrollX
    let offset = flag ? this.wrapper.offsetHeight / 3 : this.wrapper.offsetWidth
    if (this.options.ifMomentum && timeDif < this.options.momentumTime &&
        Math.abs(dis) < this.options.momentumTime) {
      let posInfo = momentum(dis, timeDif, newPos, this.options.momentumDeceleration, maxScroll, minScroll, offset)
      newPos = posInfo.x
      duration = posInfo.duration
      ease = 'ease-out'
    }

    if (this.options.loop && this.options.scrollX) {
      let newPage = this._nearestPage()
      this.currentPage = newPage
      newPos = newPage.x
      duration = 300
      ease = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    }
    // console.log(duration)
    if (newPos !== this.x && !flag) {
      this.scrollTo(newPos, duration, ease)
    } else if (newPos !== this.y && flag) {
      this.scrollTo(newPos, duration, ease, true)
    }
  }

  MScroll.prototype.stop = function () {
    this.isInTransition = false
    let flag = !this.options.scrollX
    let curPos = getComputedPos(this.scroller, flag)
    this.scrollTo(curPos, 0, '', flag)
    // this.x = curPos
    flag ? this.y = curPos : this.x = curPos
  }

  MScroll.prototype.resetPosition = function (flag) {
    let x = flag ? this.y : this.x
    let time = 0
    if (!flag) {
      if (x > this.minScrollX) {
        time = 500
        x = this.minScrollX
        // this.x = this.minScrollX
      } else if (x < this.maxScrollX) {
        time = 500
        x = this.maxScrollX
        // this.x = this.maxScrollX
      } else {
        return false
      }
    } else {
      if (x > this.minScrollY) {
        time = 500
        x = this.minScrollY
      } else if (x < this.maxScrollY) {
        time = 500
        x = this.maxScrollY
      } else {
        return false
      }
    }

    // this.isInTransition = true
    // this.scroller.style.transitionDuration = '1500ms'
    // this.scroller.style['transition-timing-function'] = 'cubic-bezier(0,.95,.34,1.02)'
    // this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
    // console.log(time)

    this.scrollTo(x, time, 'cubic-bezier(0,.95,.39,.82)', flag)
    // this.isInTransition = false
    return true
  }

  MScroll.prototype.scrollTo = function (x, time = 0, cubic = '', isY) {
    if (time !== 0 && !this.options.scrollY) {
      this.isInTransition = true
    }
    // console.log(this.isInTransition, time)
    this.scroller.style.transitionDuration = `${time}ms`
    this.scroller.style['transition-timing-function'] = cubic
    if (!isY) {
      this.scroller.style['transform'] = `translateX(${x}px) translateZ(0)`
      this.x = x
    } else {
      this.scroller.style['transform'] = `translateY(${x}px) translateZ(0)`
      this.y = x
    }
  }

  MScroll.prototype._transitionEnd = function (e) {
    // if (!this.isInTransition || e.target.nodeName !== this.scroller.nodeName) {
    //   console.log(e.target)
    //   return
    // }
    this.isInTransition = false
    this.scroller.style.transitionDuration = '0ms'
    if (this.options.scrollX) {
      if (!this.resetPosition()) {
        this.trigger('scrollEnd', this.currentPage)
      }
    } else {
      this.resetPosition(true)
    }
  }
}
