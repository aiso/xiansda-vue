import { SET_ITEMS, ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, PROMISE_SUCCESS } from '../constants'

/**
 * vuex的state
 */
const state = {
  items: []
}

/**
 * vuex的getters
 */
const getters = {
  items: state => state.items
}

/**
 * vuex中的actions
 */
const actions = {
  setItems ({ commit }, payload) {
    commit(SET_ITEMS, payload)
  },
  addItem ({ commit }, payload) {
    commit(ADD_ITEM, payload)
  },
  updateItem ({ commit }, payload) {
    commit(UPDATE_ITEM, payload)
  },
  removeItem ({ commit }, payload) {
    commit(REMOVE_ITEM, payload)
  }  
}


/**
 * vuex中的mutations
 */
const mutations = {
  [SET_ITEMS] (state, payload) {
    state.items = payload
  },
  [ADD_ITEM] (state, payload) {
    state.items.push(payload)
  },
  [UPDATE_ITEM] (state, payload) {
    const idx = state.items.findIndex( item => item.id == payload.id )
    state.items.splice(idx, 1, payload)
  },
  [REMOVE_ITEM] (state, payload) {
    const idx = state.items.findIndex( item => item.id == payload )
    state.items.splice(idx, 1)
  }  
}

export default {
  state,
  getters,
  actions,
  mutations
}