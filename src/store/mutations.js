import type from './mutations-type'

let mutations = {
  [type.CHANGE_MV] (state, mv) {
    state.mv = mv
  }
}

export default mutations
