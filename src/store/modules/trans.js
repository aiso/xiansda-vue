import createPersist from 'utils/store'
import {
  SET_WORKS,
} from '../constants'

const localStore = createPersist('XSD_USER_TRANS', { works:[] }, { expires:30*60*1000 })
const state = localStore.get();

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
    localStore.set(state)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
