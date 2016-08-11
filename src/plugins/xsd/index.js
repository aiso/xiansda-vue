/* global Vue */
import * as xapi from './xapi';

const xsd = {}

xsd.install = function (Vue) {
	if(this.installed) return;

	Object.defineProperties(Vue.prototype, {
	  xapi:{
	      get() {
	        return xapi;
	      }
	  }
	})

	this.installed = true;
}


if (window.Vue) {
  window.xapi = xapi
  Vue.use(xsd)
}

module.exports = xsd