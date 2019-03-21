export default function momentum (current, start, time, min, max, wrapperSize) {
  let distance = current - start
  let speed = distance / time
  // console.log(speed)
  let des = current + speed / 0.008
  let duration = 2500
  if (des > min) {
    des = min + wrapperSize / 4
    duration = 200
  } else if (des < max) {
    des = max - wrapperSize / 4
    duration = 200
  }
  return {
    des,
    duration
  }
}
