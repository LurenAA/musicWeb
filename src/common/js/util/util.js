export function randomNum (lowerLimit, upperLimit) {
  if (typeof lowerLimit !== 'number' || typeof upperLimit !== 'number') {
    console.log('randow need number params')
    return -1
  }
  return Math.round(Math.random() * upperLimit + lowerLimit)
}

export function sliceSingersName (singer) {
  if (!Array.isArray(singer)) {
    console.log('singerName need array params')
    return 'error'
  }
  let nameString = ''
  singer.forEach(value => {
    nameString += value.name + '/'
  })
  return nameString.substring(0, nameString.length - 1)
}

export function formatTime (time) {
  time = parseInt(time)
  let min = parseInt(time / 60)
  let sec = parseInt(time % 60)
  return `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
}

export function getTimeString (time) {
  let theDate = new Date(time * 1000)
  return `${theDate.getFullYear()}-${theDate.getUTCMonth() + 1}-${theDate.getUTCDate()}`
}
