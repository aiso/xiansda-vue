import request from 'utils/request'
import createPersist from 'utils/store'

import { SET_AUTH, AUTH_KEY, SET_USER, SET_PROFILE } from '../constants'

const localStore = createPersist(AUTH_KEY, { user:null, profile:null }, { expires:30*60*1000 })
const state = localStore.get();

const getters = {
  user: state => state.user,
  profile: state => state.profile
}

const actions = {
  setAuth ({ commit }, auth) {
    commit(SET_AUTH, auth)
  },
  setUser({ commit }, user) {
    commit(SET_USER, user)
  },
  setProfile({ commit }, profile) {
    commit(SET_PROFILE, profile)
  }
}

const mutations = {
  [SET_AUTH] (state, payload) {
    state = Object.assign(state, payload)
    localStore.set(payload)
  },
  [SET_USER] (state, payload) {
    state.user = payload
    localStore.set(state)
  },
  [SET_PROFILE] (state, payload) {
    state.profile = payload
    localStore.set(state)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
