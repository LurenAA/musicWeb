export default function eventMixin (MScroll) {
  MScroll.prototype.addEventListener = function (type, fn, once = false, _this = this) {
    if (!this._events) {
      this._events = {}
    }
    !this._events[type] && (this._events[type] = [])

    function margic () {
      _this.removeEventListener(type, margic)
      fn.apply(_this, [].slice.call(arguments, 1))
    }
    let func = once ? margic : fn
    this._events[type].push({
      fn: func,
      callee: _this
    })
  }

  MScroll.prototype.removeEventListener = function (type, fn) {
    if (!this._events[type]) {
      return
    }
    let index = this._events[type].findIndex(value => {
      if (value.fn === fn) {
        return true
      }
    })
    index !== -1 && this._events[type].splice(index, 1)
  }

  MScroll.prototype.trigger = function (type) {
    if (!this._events || !this._events[type]) {
      return
    }
    for (let i = 0; i < this._events[type].length; i++) {
      let {callee, fn} = this._events[type][i]
      fn.apply(callee, [].slice.call(arguments, 1))
    }
  }
}
