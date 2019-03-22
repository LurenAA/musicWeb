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

export function momentum (distance, time, curLoc, deceleration, max, min, containerWidth) {
  let speed = distance / time
  let duration = 500
  let newPos = curLoc + speed / deceleration
  if (newPos < max) {
    newPos = max - containerWidth / 4
    duration = 1000
  } else if (newPos > min) {
    newPos = min + containerWidth / 4
    duration = 1000
  }
  // console.log(newPos - curLoc, duration)
  return {
    x: newPos * 2,
    duration: duration
  }
}
