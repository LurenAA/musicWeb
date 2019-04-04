function setOptions (pos, el) {

}

export default class Boom {
  constructor (el) {
    if (!el.style) {
      console.error('boom need a element')
      return
    }
    this.el = el
    let info = el.getBoundingClientRect()
    this.elInfo = {
      width: info.width,
      height: info.height,
      left: info.left,
      top: info.top
    }

    this.cloneNode()
    this.insertSmallDiv()
    setTimeout(function () {
      this.runBoom()
    }.bind(this), 20)
  }

  runBoom () {
    let centerX = this.elInfo.top + this.elInfo.height / 2
    let centerY = this.elInfo.left + this.elInfo.width / 2
    let nodeChilren = this.cloneNode.children
    let x, y, k, b, distX, distY
    for (let i in nodeChilren) {
      x = nodeChilren[i].style.width / 2 + nodeChilren[i].style.left
      y = nodeChilren[i].style.height / 2 + nodeChilren[i].style.top
      k = (y - centerY) / (x - centerX)
      b = centerY - k * centerX
      distY = 2 * y - centerY
      distX = (distY - b) / k
      setOptions({
        x: distX,
        y: distY
      }, nodeChilren[i])
    }
  }

  cloneNode () {
    let cloneNode = this.el.cloneNode(false)
    this.cloneNode = cloneNode
    document.body.append(cloneNode)
    cloneNode.style.cssText = this.el.style.cssText
    let opss = {
      'animation': '',
      'width': `${this.elInfo.width}px`,
      'height': `${this.elInfo.height}px`,
      'position': 'absolute',
      'top': `${this.elInfo.top}px`,
      'left': `${this.elInfo.left}px`
    }
    for (let x in opss) {
      cloneNode.style[x] = opss[x]
    }
    if (!cloneNode.style['background-image']) {
      cloneNode.style['background-image'] = 'linear-gradient(to right, #5922da, #b428ef)'
      this.imgSrc = 'linear-gradient(to right, #5922da, #b428ef)'
    } else {
      this.imgSrc = cloneNode.style['background-image']
    }
    this.el.style.animation = ''
  }

  insertSmallDiv () {
    let height = this.elInfo.height
    let width = this.elInfo.width
    let minNumX = 10
    let minNumY
    let minSide
    minSide = Math.round(width / minNumX)
    minNumY = Math.round(height / minSide)
    let options = {
      position: 'absolute',
      width: `${minSide}px`,
      height: `${minSide}px`,
      'border-radius': '50%',
      'background-image': this.imgSrc
    }
    let allops, node
    for (let i = 0, lenX = minNumX; i < lenX; i++) {
      for (let j = 0, lenY = minNumY; j < lenY; j++) {
        if (this.cloneNode.children.length) {
          allops = {
            left: this.elInfo.left + i * minSide + 'px',
            top: this.elInfo.top + j * minSide + 'px',
            'background-position': '-' + i * minSide + 'px -' + j * minSide + 'px',
            filter: `blur(${Math.random() * 3})`,
            transform: `scale(${Math.random() * 3})`
          }
          node = this.cloneNode.children[0].cloneNode(true)
        } else {
          allops = Object.assign({}, options, {
            left: this.elInfo.left + i * minSide + 'px',
            top: this.elInfo.top + j * minSide + 'px',
            'background-position': '-' + i * minSide + 'px -' + j * minSide + 'px',
            filter: `blur(${Math.random() * 3})`,
            transform: `scale(${Math.random() * 3})`
          })
          node = document.createElement('div')
        }
        for (let x in allops) {
          node.style[x] = allops[x]
        }
        this.cloneNode.append(node)
      }
    }
    if (this.cloneNode.style['position'] === 'absolute' ||
    this.cloneNode.style['position'] === 'fixed') {
      this.cloneNode.style['position'] = 'static'
      this.cloneNode.style['height'] = '0px'
      this.cloneNode.style['width'] = '0px'
    }
  }
}
