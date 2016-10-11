import { 
  SET_ITEMS, 
  ADD_ITEM, 
  UPDATE_ITEM, 
  REMOVE_ITEM, 
  PROMISE_SUCCESS,
  SET_ACTIVITY_ITEM,
  } from '../constants'

/**
 * vuex的state
 */
const state = {
  items: [],
  activityItem: null
}

/**
 * vuex的getters
 */
const getters = {
  items: state => state.items,
  activityItem: state => state.activityItem
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
  },
  setActivityItem ({ commit }, payload) {
    commit(SET_ACTIVITY_ITEM, payload)
  },
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
  },
  [SET_ACTIVITY_ITEM] (state, payload) {
    state.activityItem = payload
  }    
}

export default {
  state,
  getters,
  actions,
  mutations
}