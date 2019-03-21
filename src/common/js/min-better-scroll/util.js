import warn from './warn'
export function getComputedPos (el) {
  if (!el || !el.style) {
    warn('getComputedPos need a el')
  }
  let matrix = window.getComputedStyle(el)['transform']
  if (matrix === 'none') {
    return 0
  } else {
    let posArray = matrix.split('(')[1].split(',')
    return +posArray[4]
  }
}
