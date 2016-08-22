/* global Vue */
import Promise from 'nd-promise'
import store from 'store'
import request from 'utils/request'
import base64 from 'utils/base64'

import { SET_AUTH } from 'store/constants'

const xsd = {}
xsd.install = function (Vue) {
	if(this.installed) return;

  function chkAuth(){
    const user = store.getters.auth
    if(!!user){
      return  { mutate: options => {
        //console.log(user);
        options['headers']['Authorization'] = base64.encode(user.id + ":" + user.token);
        return Promise.resolve(options)
      } }
    }

    return null
  }

	Object.defineProperties(Vue.prototype, {
	  xsd:{
      get() {
        const _request = options => {
          return request(Object.assign(options, chkAuth())).then(data => {
            if(!!data.aiso_auth_refresh){
              store.commit(SET_AUTH, data.aiso_auth_refresh)
            }
            return data;
          }).catch(result=>{
            if(result.error.code == 401){
              store.commit(SET_AUTH, null);
              this.$route.router.go({ name:'login' })
            }else{
              this.$alert.error(result)
            }

            return Promise.reject(result)
          })
        }

        const api = {
          get: url => _request({ url }),
          post: (url, data) => _request({ url, method:'POST', params:data }),
          delete: url => _request({ url, method:'DELETE' })
        }
        return {
          api
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
    }
	})

	this.installed = true;
}


if (window.Vue) {
  //window.xsd = xsdModules
  Vue.use(xsd)
}

module.exports = xsd