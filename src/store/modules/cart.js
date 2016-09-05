import createPersist from 'utils/store'

import { CART_KEY, SET_CART } from '../constants'

const localStore = createPersist(CART_KEY, { cart:[] })
const state = localStore.get();

const getters = {
  cart: state => state.cart,
}

const actions = {
  setCartItem ({ commit }, cartItem) {
    const cart = state.cart.filter(i=>i.id!=cartItem.id)
    cart.push(cartItem)
    commit(SET_CART, cart)
  },
}

const mutations = {
  [SET_CART] (state, payload) {
    state.cart = payload
    localStore.set(state)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
