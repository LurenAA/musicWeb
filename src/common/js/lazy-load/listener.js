export const type = {
  loading: 'loading',
  loaded: 'loaded',
  error: 'error'
}

export class Listener {
  constructor (src, el, loading, error, threshold) {
    this.src = src
    this.el = el
    this.state = type.loading
    this.error = error
    this.loading = loading
    this.threshold = threshold
    el.setAttribute('data-lastsrc', this.src)

    this._elrender()
  }

  _elrender () {
    switch (this.state) {
      case type.loading:
        this.el.setAttribute('src', this.loading)
        // this.el.setAttribute('lazy', type.loading)
        break
      case type.error:
        this.el.setAttribute('src', this.error)
        // this.el.setAttribute('lazy', type.error)
        break
      case type.loaded:
        this.el.setAttribute('src', this.src)
        // this.el.setAttribute('lazy', type.loaded)
        break
      default:
        console.log('err')
        break
    }
  }

  loadPicAsynch () {
    let newImage = new Image()
    newImage.src = this.src
    let _this = this

    newImage.onload = function () {
      _this.state = type.loaded
      // console.log(1)
      _this._elrender()
    }

    newImage.onerror = function () {
      _this.state = type.error
      _this._elrender()
      console.log(1)
      // _this.loadPicAsynch()
    }
  }

  ifInView () {
    let h = this.el.getBoundingClientRect().top
    return h < this.threshold && h > 0
  }
}
