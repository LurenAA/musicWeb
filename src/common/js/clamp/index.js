import Clamp from './clamp'

// options
//   useWekit:false
//   clamp 2

export default function clamp (el, options) {
  if (!options) {
    options = {}
  }
  let clamp = new Clamp(options)

  clamp.bind(el)
  if (clamp.options.useWekit) {
    if (clamp.el.style['-webkit-line-clamp'] !== undefined) {
      clamp.el.style['overflow'] = 'hidden'
      clamp.el.style['text-overflow'] = 'ellipsis'
      clamp.el.style['display'] = '-webkit-box'
      clamp.el.style['-webkit-line-clamp'] = clamp.options.clamp
      clamp.el.style['-webkit-box-orient'] = 'vertical'
      return
    }
  }

  clamp.truncate()
}
