import request from 'utils/request'
import createPersist from 'utils/store'

import { SET_NAVIGATOR, NAVIGATOR_KEY } from '../constants'

const localStore = createPersist(NAVIGATOR_KEY, { navigator:null })
const state = localStore.get();

const getters = {
  navigator: state => state.navigator
}

const actions = {
  setNavigator ({ commit }, payload) {
    commit(SET_NAVIGATOR, payload)
  }
}

const mutations = {
  [SET_NAVIGATOR] (state, payload) {
    state.navigator = payload
    localStore.set(state)
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}