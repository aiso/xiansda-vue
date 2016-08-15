import * as xapi from 'utils/xapi'
import { SUPPLIER_SET_ITEMS, PROMISE_SUCCESS } from '../constants'

/**
 * vuex的state
 */
const state = {
  items: null
}

/**
 * vuex的getters
 */
const getters = {
  supplierItems: state => state.items
}

/**
 * vuex中的actions
 */
const actions = {
  setSupplierItems ({ commit }, payload) {
    commit(SUPPLIER_SET_ITEMS, payload)
  }
}


/**
 * vuex中的mutations
 */
const mutations = {
  [SUPPLIER_SET_ITEMS] (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}