import * as xapi from 'utils/xapi'
import { SUPPLIER_SET_ITEMS, PROMISE_SUCCESS } from '../constants'

/**
 * vuex的state
 */
const state = {
  supplierItems: null
}

/**
 * vuex的getters
 */
const getters = {
  supplierItems: state => state.supplierItems
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
    state.supplierItems = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}