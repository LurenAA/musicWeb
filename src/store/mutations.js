import type from './mutations-type'

let mutations = {
  [type.CHANGE_MV] (state, mv) {
    state.mv = mv
  },
  [type.CHANGE_IFSHOWPLAYER] (state, ifshow) {
    state.ifShowPlayer = ifshow
  },
  [type.SET_SONG] (state, param) {
    state.song = param
  },
  [type.SET_SONGURL] (state, param) {
    state.song.url = param
  }
}

export default mutations
