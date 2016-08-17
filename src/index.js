import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'plugins/validator'
import I18n from 'plugins/i18n'
import IScroll from 'plugins/iScroll'
import App from 'app'
import { routes, alias } from 'routes'
import store from 'store'

if (module.hot) {
  module.hot.accept()
}

//  dev global debug
Vue.config.debug = __DEV__

// form validator use
Vue.use(Validator)

// iscroll use
Vue.use(IScroll);

// I18n use
Vue.use(I18n, {
  data () {
    return store.getters.i18n
  }
})

//  vue-router use
Vue.use(Router)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

//  auth check
router.beforeEach(transition => {
  store.dispatch('setProgress', 80)
//console.log('auth='+transition.to.auth);
  if(transition.to.auth){
    const user = store.getters.auth
    if(!user){
      transition.abort()
      router.go('/login')
    }else if(typeof(transition.to.auth) == 'number' && transition.to.auth != user.role){
      transition.abort()
      alert('角色错误！')
    }
    else
      transition.next()
  }else{
    transition.next()
  }

})

router.afterEach(transition => {
  window.scrollTo(0, 0)
  store.dispatch('setProgress', 100)
})


import VueAutosize from 'vue-autosize'
Vue.use(VueAutosize)

import xsd from 'plugins/xsd'
Vue.use(xsd)

router.start(App, 'app')

if(__DEV__ && __WEINRE__){
  document.write('<script src="http://' + __LOCALHOST__ + ':8099/target/target-script-min.js#anonymous"></script>')
}
