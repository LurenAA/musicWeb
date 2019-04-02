import type from './mutations-type'

let mutations = {
  [type.CHANGE_MV] (state, mv) {
    state.mv = mv
  },
  [type.CHANGE_IFSHOWPLAYER] (state, ifshow) {
    state.ifShowPlayer = ifshow
  }
}

export default mutations
