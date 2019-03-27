import { type, Listener } from './listener'

export default function (Vue) {
  return class Lazy {
    constructor (options) {
      this.options = options
      this.ListenerList = []
      this.threshold = document.documentElement.clientHeight * (1 + this.options.threshold)
      this._initEvent()
    }

    add (el, binding, vnode) {
      let newLis = new Listener(binding.value, el, this.options.loading, this.options.error, this.threshold)
      this.ListenerList.push(newLis)
    }

    update (el, binding, vnode) {
      if (el.dataset['lastsrc'] === binding.value) {
        return
      }
      let index = this.ListenerList.findIndex(value => {
        return value.el.dataset['lastsrc'] === el.dataset['lastsrc']
      })
      if (index !== -1) {
        this.ListenerList[index].src = binding.value
      } else {
        this.add(el, binding, vnode)
      }
      Vue.nextTick(() => {
        this.handleEvent()
      })
    }

    inserted () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.handleEvent.apply(this), 500)
    }

    _initEvent () {
      window.addEventListener('scroll', this)
      window.addEventListener('touchend', this)
      window.addEventListener('touchmove', this)
      window.addEventListener('transitionend', this)
    }

    handleEvent (e) {
      let freeList = []
      for (let x = 0, len = this.ListenerList.length; x < len; x++) {
        let obj = this.ListenerList[x]
        if (obj.state === type.loaded || obj.state === type.error) {
          freeList.push(obj)
        }
        let dis = obj.ifInView()
        if (dis) {
          obj.loadPicAsynch()
        }
      }
      for (let x = 0, len = freeList.length; x < len; x++) {
        this.ListenerList.splice(this.ListenerList.indexOf(freeList[x]), 1)
      }
    }
  }
}
