/* global Vue */
import Promise from 'nd-promise'
import store from 'store'
import request from 'utils/request'
import base64 from 'utils/base64'

import { SET_AUTH, SET_USER, SET_PROFILE, SET_NAV_MAIN_ROUTES } from 'store/constants'

const xsd = {}
xsd.install = function (Vue) {
	if(this.installed) return;

  function chkAuth(){
    const user = store.getters.user
    if(!!user){
      return  { mutate: options => {
        //console.log(user);
        options['headers']['Authorization'] = base64.encode(user.id + ":" + user.token);
        return Promise.resolve(options)
      } }
    }

    return null
  }

  const xsdCache = [];
	Object.defineProperties(Vue.prototype, {
	  xsd:{
      get() {
        const _request = options => {
          return request(Object.assign(options, chkAuth())).then(data => {
            if(!!data.aiso_auth_refresh){
              store.commit(SET_USER, data.aiso_auth_refresh)
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


        const apiGet = url => _request({ url })
        const apiPost = (url, data) => _request({ url, method:'POST', params:data })
        const apiDelete = url => _request({ url, method:'DELETE' })
        const apiGetCache = url => {
          if(!!xsdCache[url])
            return Promise.resolve(xsdCache[url])
          else{
            return apiGet(url).then(data=>{
              xsdCache[url] = data
              return data
            })
          }
        }

        const api = {
          get:apiGet,
          post:apiPost,
          delete:apiDelete,
          getCache:apiGetCache
        }


        const user = {
          login: data=>{
            store.commit(SET_AUTH, { user:data.user, profile:data.profile });

            if(data.user.role == 10){
              store.commit(SET_NAV_MAIN_ROUTES, require('routes/client/navigator'))
              api.get('client/favorites').then(data=>{
                store.commit(SET_PROFILE, Object.assign({ }, store.getters.profile, {
                  favorites: data.favorites
                }));
              })
            }
            else if(data.user.role == 20){
              store.commit(SET_NAV_MAIN_ROUTES, require('routes/supplier/navigator'))
            }
          },
          logout: ()=>{
            this.$confirm.open('确实要退出登录？').then(()=>{
              store.commit(SET_AUTH, null)
              this.$route.router.go('/')
            })
          }
        }

        return {
          api,
          user
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
    $navbar: {
      get () {
        return this.$root.$refs.xsdNavbar
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