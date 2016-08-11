import request from 'utils/request'
import createPersist from 'utils/store'

import { SET_AUTH, AUTH_KEY } from '../constants'

const localStore = createPersist(AUTH_KEY, { auth:null }, { expire:30*60*1000 })
const state = localStore.get();

const getters = {
  auth: state => state.auth
}

const actions = {
  setAuth ({ commit }, auth) {
    commit(SET_AUTH, auth)
  }
}

const mutations = {
  [SET_AUTH] (state, payload) {
    state.auth = payload;
    localStore.set({ auth:payload })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
