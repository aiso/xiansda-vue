import {
  SET_NOTICES,
  ADD_NOTICE,
  REMOVE_NOTICE,
  UPDATE_NOTICE
} from '../constants'

const state = {
  notices: []
}

const getters = {
  notices: state => state.notices,
}

const actions = {
  setNotices ({ commit }, notices) {
    commit(SET_NOTICES, notices)
  },
  addNotice ({ commit }, notice) {
    commit(ADD_NOTICE, notice)
  },
  updateNotice ({ commit }, payload) {
    commit(UPDATE_NOTICE, payload)
  },
  removeNotice ({ commit }, payload) {
    commit(REMOVE_NOTICE, payload)
  },
}

const mutations = {
  [SET_NOTICES] (state, payload) {
    state.notices = payload
  },
  [ADD_NOTICE] (state, payload) {
    state.notices.push(payload)
  },
  [UPDATE_NOTICE] (state, payload) {
    const idx = state.notices.findIndex( notice => notice.name == payload.name )
    state.notices.splice(idx, 1, payload)
  },
  [REMOVE_NOTICE] (state, payload) {
    const idx = state.notices.findIndex( notice => notice.name == payload )
    state.notices.splice(idx, 1)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}