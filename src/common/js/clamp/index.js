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
  clamp.truncate()
}
