import {
  SET_WORKS,
} from '../constants'

const state = {
  works: []
}

const getters = {
  works: state => state.works,
}

const actions = {
  setWorks ({ commit }, works) {
    commit(SET_WORKS, works)
  },
}

const mutations = {
  [SET_WORKS] (state, payload) {
    state.works = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
