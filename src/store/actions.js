import Song from 'common/js/song/song'

let actions = {
  addSong (context, item) {
    if (!(item instanceof Song)) {
      console.log('need a song object')
      return
    }
    let preList = context.getters.playList.concat()
    let repeat = preList.findIndex(value => {
      return value.mid === item.mid
    })
    if (repeat !== -1) {
      preList.splice(repeat, 1)
    }
    preList.unshift(item)
    context.commit('SET_PLAYLIST', preList)
  },

  removeSong (context, mid) {
    let preList = context.getters.playList.concat()
    let index = preList.findIndex(value => {
      return value.mid === mid
    })
    if (index !== -1) {
      preList.splice(index, 1)
    }
  }
}

export default actions
