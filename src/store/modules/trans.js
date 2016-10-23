import createPersist from 'utils/store'
import {
  SET_TRANSES,
} from '../constants'

const state = {
  transes: [],
}

const getters = {
  transes: state => state.transes,
}

const actions = {
  setTranses ({ commit }, transes) {
    commit(SET_TRANSES, transes)
  },
}

const mutations = {
  [SET_TRANSES] (state, payload) {
    state.transes = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
