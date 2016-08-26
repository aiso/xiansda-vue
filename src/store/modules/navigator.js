import request from 'utils/request'
import createPersist from 'utils/store'

import { SET_NAV_MAIN_ROUTES, SET_NAV_CURR_ROUTE, NAVIGATOR_KEY } from '../constants'

const localStore = createPersist(NAVIGATOR_KEY, { navMainRoutes:null })
const state = Object.assign({ navMainRoutes:null, navCurrRoute:null }, localStore.get())

const getters = {
  navMainRoutes: state => state.navMainRoutes,
  navCurrRoute: state => state.navCurrRoute
}

const actions = {
  setMainRoutes ({ commit }, payload) {
    commit(SET_NAV_MAIN_ROUTES, payload)
  },
  setCurrRoute ({ commit }, payload) {
    commit(SET_NAV_CURR_ROUTE, payload)
  }  
}

const mutations = {
  [SET_NAV_MAIN_ROUTES] (state, payload) {
    state.navMainRoutes = payload
    localStore.set({ navMainRoutes:state.navMainRoutes })
  },
  [SET_NAV_CURR_ROUTE] (state, payload) {
    state.navCurrRoute = payload
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}