import {
  SET_FAVORITES,
} from '../constants'

const state = {
  favorites: []
}

const getters = {
  favorites: state => state.favorites,
}

const actions = {
  setFavorites ({ commit }, favorites) {
    commit(SET_FAVORITES, favorites)
  },
}

const mutations = {
  [SET_FAVORITES] (state, payload) {
    state.favorites = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
