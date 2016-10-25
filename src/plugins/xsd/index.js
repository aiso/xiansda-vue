/* global Vue */
import store from 'store'

import { 
  SET_AUTH, 
} from 'store/constants'

import api from './api'
import sync from './sync'

const xsd = {}
xsd.install = function (Vue) {
	if(this.installed) return;

	Object.defineProperties(Vue.prototype, {
	  xsd:{
      get() {
        return {
          api,
          sync,
          item:require('./item'),
          user:require('./user'),
          service:require('./service'),
          action:require('./action'),
          static:require('./static'),
          nav:require('./nav'),
          trans:require('./trans'),
          regex:require('./regex'),
        }
      }
	  },
    $alert: {
      get () {
        return this.$root.$refs.modalAlert
      }
    },
    $confirm: {
      get () {
        return this.$root.$refs.modalConfirm
      }
    },
    $text: {
      get () {
        return this.$root.$refs.modalText
      }
    },
    $navbar: {
      get () {
        return this.$root.$refs.xsdNavbar
      }
    }
 	})

  require('./filter').install(Vue)
  
	this.installed = true;
}

xsd.init = () =>{
  return sync.load('base','transes')
}

if (window.Vue) {
  //window.xsd = xsdModules
  Vue.use(xsd)
}

module.exports = xsd