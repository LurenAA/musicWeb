import prefix from './util'
import insertStyle from './insertStyle'
let animation = prefix('animation')

function getKeyFramesItems (items, index) {
  let pContent = ` ${index} {`
  if (!items.pos) {
    console.error('error in getKeyFramesItems')
    return ' '
  }
  items.pos.length === 2 && items.pos.push(0)
  pContent += `transform: translate3d(${items.pos[0]}px,${items.pos[1]}px,${items.pos[2]}px)`
  if (items.scale) {
    pContent += ` scale(${items.scale}) `
  }
  pContent += ';} '
  return pContent
}

function addStyleAnimation (el, op) {
  if (!el) {
    console.error('el error')
    return
  }
  const keys = [
    'animation-name',
    'animation-fill-mode',
    'animation-direction',
    'animation-timing-function',
    'animation-duration'
  ]
  let animationString = ' '
  keys.forEach(value => {
    animationString += op[value] === undefined ? ' ' : op[value] + ' '
  })
  el.style[animation] = animationString
}

export default class animations {
  constructor () {
    this.animationsList = {}
  }

  addAnimation (name, options) {
    if (typeof name !== 'string' ||
      (options !== undefined && typeof options !== 'object')) {
      console.error('create-animations: addAnimations args error')
      return
    }
    let content = `@keyframes ${name} {`
    if (options.animation) {
      for (let x in options.animation) {
        content += getKeyFramesItems(options.animation[x], x)
      }
    }
    let style = insertStyle(content)
    if (typeof style !== 'number') {
      this.style = style
      style = 0
    }
    let opt = {
      style: style,
      clearAnimationAfter: !!options.clearAnimationAfter,
      'animation-name': name,
      'animation-fill-mode': options.fillMode || '',
      'animation-direction': options.direction || '',
      'animation-timing-function': options.timingFunc || 'ease',
      'animation-duration': options.duration + 'ms' || '500ms'
    }
    if (this.animationsList[name]) {
      console.log('cover old one')
    }
    this.animationsList[name] = opt
  }

  runAnimation (el, name) {
    if (!this.animationsList[name] || !el) {
      console.error('do not has this animation or el')
      return
    }
    if (this.animationsList[name].clearAnimationAfter) {
      el.addEventListener('animationend', this)
    }
    addStyleAnimation(el, this.animationsList[name])
  }

  handleEvent (e) {
    if (e.type === 'animationend') {
      e.target.removeEventListener('animationend', this)
      e.target.style[animation] = ''
    }
  }

  destroy () {
    if (this.style) {
      this.style.remove()
    }
  }
}
