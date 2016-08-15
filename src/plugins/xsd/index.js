/* global Vue */
import * as api from 'utils/xapi';
import * as nav from './nav';

const xsd = {}
const xsdModules = {
  api,
  nav
}

xsd.install = function (Vue) {
	if(this.installed) return;

	Object.defineProperties(Vue.prototype, {
	  xsd:{
	      get() {
	        return xsdModules
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
    }
	})

	this.installed = true;
}


if (window.Vue) {
  //window.xsd = xsdModules
  Vue.use(xsd)
}

module.exports = xsd