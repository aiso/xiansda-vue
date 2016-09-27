import {
  ADD_TOAST,
  DELETE_TOAST
} from '../constants'


const state = {
  toasts: []
}

const getters = {
  toasts: state => state.toasts
}

const actions = {
  addToast ({ commit }, toast) {
    if (typeof toast === 'string') {
      toast = {
        class: 'info',
        message: toast
      }
    }

    toast = Object.assign({ class:'info', timeout:3000 }, toast)
    toast._id = Date.now()

    if(toast.timeout > 0){
      setTimeout(() => {
        commit(DELETE_TOAST, toast)
      }, toast.timeout)
    }else{
      toast.remove = () => {
        commit(DELETE_TOAST, toast)
      }
    }

    commit(ADD_TOAST, toast)
  }
}

const mutations = {
  [ADD_TOAST] (state, payload) {
    state.toasts.push(payload)
  },

  [DELETE_TOAST] (state, payload) {
    state.toasts.$remove(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
