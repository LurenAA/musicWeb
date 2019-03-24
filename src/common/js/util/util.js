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
