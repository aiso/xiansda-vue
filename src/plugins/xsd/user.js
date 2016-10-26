import store from 'store'
import api from './api'
import staticData from './static'

import { 
  SET_AUTH, 
  SET_NAV_MAIN_ROUTES,
  SET_FAVORITES,
} from 'store/constants'

export default {
  login: auth=>{
    return api.post('user/login', auth).then( data => {
      store.commit(SET_AUTH, { user:data.user, profile:data.profile });
      return data.user
    }).then(user=>{
      if(user.role == staticData.role.client){
        store.commit(SET_NAV_MAIN_ROUTES, require('routes/client/navigator'))
        return true
        /*
        return api.get('client/props').then(data=>{
          store.commit(SET_FAVORITES, data.favorites)
          return true
        })*/
      }
      else if(user.role == staticData.role.supplier){
        store.commit(SET_NAV_MAIN_ROUTES, require('routes/supplier/navigator'))
        return true
      }
      else if(user.role == staticData.role.station){
        store.commit(SET_NAV_MAIN_ROUTES, require('routes/station/navigator'))
        return true
      }else
        return false
    })
  },
  logout: ()=>{
    store.commit(SET_AUTH, null)
  }
}