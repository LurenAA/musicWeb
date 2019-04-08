export default function install (Vue, options) {
  class Store {
    constructor () {
      this.storage = window.localStorage
      this._checkIfFull()
    }

    _checkIfFull () {
      try {
        this.storage.setItem('_try', '_trycontent')
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          let _nofunc = function () {}
          Vue.prototype._checkIfFull = _nofunc
          Vue.prototype.set = _nofunc
          Vue.prototype.get = _nofunc
          Vue.prototype.add = _nofunc
          Vue.prototype.remove = _nofunc
          Vue.prototype.delete = _nofunc
        }
      } finally {
        this.storage.removeItem('_try')
      }
    }

    set (key, item) {
      if (!key || !item || item === {}) {
        return
      }
      this.storage.setItem(key, JSON.stringify(item))
    }

    get (key) {
      let val = this.storage.getItem(key)
      if (val) {
        return JSON.parse(val)
      } else {
        return val
      }
    }

    add (key, obj) {
      let item = this.storage.getItem(key)
      if (!item || !obj || typeof obj !== 'object') {
        return
      }
      item = JSON.parse(item)
      for (let i in obj) {
        item[i] = obj[i]
      }
      this.set(key, item)
    }

    remove (key) {
      if (!key) {
        return
      }
      this.storage.removeItem(key)
    }

    delete (key, innerKey) {
      if (!key || !innerKey) {
        return
      }
      let theKey = this.storage.getItem(key)
      if (!theKey) {
        return
      }
      theKey = JSON.parse(theKey)
      if (!theKey[innerKey]) {
        return
      }
      delete theKey[innerKey]
      theKey = JSON.stringify(theKey)
      this.storage.setItem(key, theKey)
    }
  }
  Vue.prototype.localStorage = new Store()
}
