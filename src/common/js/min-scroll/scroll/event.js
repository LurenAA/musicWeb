export function initEventMethods (MinScroll) {
  MinScroll.prototype.on = function (type, fn) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    let _this = this
    this._events[type].push({fn: fn, caller: _this})
  }

  MinScroll.prototype.off = function (type, fn) {
    let event = this._events[type]
    if (!event) {
      return
    }
    let index = event.findIndex(value => {
      return value.fn === fn
    })
    event.splice(index, 1)
  }

  MinScroll.prototype.once = function (type, fn) {
    function onceExecutor () {
      this.off(type, onceExecutor)

      fn.apply(this, arguments)
    }
    this.on(type, onceExecutor)
  }

  MinScroll.prototype.trigger = function (type) {
    let events = this._events[type]
    if (!events) {
      return
    }
    for (let x = 0; x < events.length; x++) {
      let {fn, caller} = events[x]
      if (fn) {
        fn.apply(caller, [].slice.call(arguments, 1))
      }
    }
  }
}
