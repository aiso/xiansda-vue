/* global Vue */
import Promise from 'nd-promise'
import store from 'store'
import request from 'utils/request'
import base64 from 'utils/base64'
import { createStaticData } from 'utils/static-data'

import { SET_AUTH, SET_USER, SET_PROFILE, SET_NAV_MAIN_ROUTES } from 'store/constants'

import service from './service'

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

  const xsdCache = []
  const _items = []
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


        const apiGet = url => {
          if(typeof(url) == 'string')
            return _request({ url })
          else if(url instanceof Array){
            return Promise.all(url.map(u=>apiGet(u)))
          }
        }
        const apiPost = (url, data) => _request({ url, method:'POST', params:data })
        const apiDelete = url => _request({ url, method:'DELETE' })
        const apiGetCache = url => {
          if(typeof(url) == 'string'){
            if(!!xsdCache[url] && xsdCache[url].dirty !== true )
              return Promise.resolve(xsdCache[url])
            else{
              return apiGet(url).then(data=>{
                xsdCache[url] = data
                return data
              })
            }
          }
          else if(url instanceof Array){
            return Promise.all(url.map(u=>apiGetCache(u)))
          }
        }

        const api = {
          get:apiGet,
          post:apiPost,
          delete:apiDelete,
          getCache:apiGetCache,
          dirty(url){
            if(!!xsdCache[url]) xsdCache[url].dirty = true
          }
        }

        const item = {
          get(id){
            if(id instanceof Array){
              const reqs = id.filter(i=>typeof(_items[i]) == 'undefined')
              if(reqs.length > 0){
                return api.get('items/'+reqs.join(',')+'?with=images&fields=content').then(data=>{
                  data.items.forEach(i=>{
                    _items[i.id] = i
                  })
                  return id.map(i=>_items[i])
                })
              }else{
                return Promise.resolve(id.map(i=>_items[i]))
              }
            }else if(typeof(id) === 'number'){
              if(!!_items[id])
                return Promise.resolve(_items[id])
              else
                return api.get('item/'+id+'?with=images&fields=content').then(data=>{
                  _items[id] = data.item
                  return data.item
                })
            }else if(typeof(id) === 'string'){
              return this.get(parseInt(id))
            }else
              return Promise.resolve(null)
          },
          dirty(id){
            delete _items[id]
          }
        }


        const user = {
          login: data=>{
            store.commit(SET_AUTH, { user:data.user, profile:data.profile });

            if(data.user.role == 10){
              store.commit(SET_NAV_MAIN_ROUTES, require('routes/client/navigator'))
              /*
              api.get('client/favorites').then(data=>{
                store.commit(SET_PROFILE, Object.assign({ }, store.getters.profile, {
                  favorites: data.favorites
                }));
              })*/
            }
            else if(data.user.role == 20){
              store.commit(SET_NAV_MAIN_ROUTES, require('routes/supplier/navigator'))
            }
            else if(data.user.role == 30){
              store.commit(SET_NAV_MAIN_ROUTES, require('routes/station/navigator'))
            }
          },
          logout: ()=>{
            this.$confirm.open('确实要退出登录？').then(()=>{
              store.commit(SET_AUTH, null)
              this.$route.router.go('/')
            })
          }
        }
/*
        api.get('static/default').then(data=>{
          _staticData = createStaticData(data.statics)
        })
*/
        return {
          api,
          item,
          user,
          service,
          default:require('./default'),
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
    $navbar: {
      get () {
        return this.$root.$refs.xsdNavbar
      }
    }
	})


	this.installed = true;
}

xsd.init = () =>{
  return request({ url:'static/default' }).then(data=>{
    service.init(data.services)
    return true
  })
}

if (window.Vue) {
  //window.xsd = xsdModules
  Vue.use(xsd)
}

module.exports = xsd