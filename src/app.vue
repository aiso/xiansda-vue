<template>
  <div class="container">
    <c-progress class="progress" :progress="progress"></c-progress>
    <c-toast class="toast" :toasts="toasts"></c-toast>
    <!--v-header :routes="routes"></v-header-->
    <c-header></c-header>
    <c-notices></c-notices>
    <div class="content">
      <router-view class="router-view" transition="slide-up" transition-mode="out-in" keep-alive-stop></router-view>
    </div>
    <m-text v-ref:modal-text></m-text>
    <c-alert v-ref:modal-alert></c-alert>
    <c-confirm v-ref:modal-confirm></c-confirm>

    <div v-if="!!navigator">
      <c-xsd-navigator :title="navigator.title" v-ref:xsd-navbar>
        <a slot="navButton" @click="navigator.navButton.click" :class="{ 'active':navigator.navButton.toggle }">
          <c-icon :name="navigator.navButton.icon" class="block"></c-icon>
        </a>
        <div slot="navOptions" v-for="option in navigator.navOptions">
          <a @click="option.click"><c-icon :name="option.icon" class="block"></c-icon></a>  
        </div>
      </c-xsd-navigator>
      <c-xsd-menu :toggle.sync="navigator.navButton.toggle" side="left" :items="navigator.mainItems"></c-xsd-menu>
    </div>
  </div>

</template>

<script>
import { 
  CProgress, 
  CToast, 
  CQrcode, 
  CAlert, 
  CConfirm, 
  CXsdNavigator, 
  CXsdMenu, 
  CIcon,
  CNotices
} from 'components'

import MText from 'views/common/m-text'
import CHeader from 'views/common/c-header'
import VFooter from 'views/common/v-footer'
import store from 'store'
import { mapGetters, mapActions } from 'vuex'
import { routes } from 'routes'

export default {
  name: 'App',
  store,

  data(){
    return{
      flag : __DEV__,
      navigator:null,
    }
  },
  computed: {
    ...mapGetters(['lang', 'i18n', 'progress', 'toasts', 'navMainRoutes', 'navCurrRoute', 'cart']),
    routes () {
      return navRoutes.call(this, routes, (key, route) => {
        return key !== '/' && route.auth !== !this.auth
      })
    }
  },

  methods: {
    ...mapActions(['setEnv', 'addNotice']),
    setNavOptions(options){
      setTimeout(()=>{
          this.navigator.navOptions = options
          console.log(this.navigator)
      }, 100);
    }    
  },

  created () {
    // for get i18n in first
    if (!this.i18n) {
      this.setEnv({
        lang: this.lang
      })
    }
  },
  watch: {
    navCurrRoute(currentRoute){
      if(!currentRoute) {
        this.navigator = null
        return
      }

      const r = this.navMainRoutes.routes.find( route=>route.name==currentRoute.name )
      let navButton, mainItems
      if(!!r){
        navButton = { toggle:false, icon:r.icon, click:()=>{ this.navigator.navButton.toggle=!this.navigator.navButton.toggle } }
        var routes = this.navMainRoutes.routes.filter( route => route.name!=this.$route.router._currentRoute.name );
        mainItems = routes.map( route=>{
          return { title:this.__(route.title), icon:route.icon, click: ()=>{ 
            this.navigator.navButton.toggle=false;
            this.$route.router.go({ name:route.name }) 
          } }
        })
      }else{
        navButton = { toggle:false, icon:'material-arrow_back', click:()=>{ history.back() } }
        mainItems = []
      }

      this.navigator = {
        title:this.title || this.__(currentRoute.title),
        navButton,
        mainItems,
        navOptions:[]
      }

    }
  },

  components: {
    CProgress,
    CToast,
    MText,
    VFooter,
    CQrcode,
    CAlert,
    CConfirm,
    CXsdNavigator,
    CXsdMenu,
    CIcon,
    CHeader,
    CNotices
  }
}
/**
 * nav routes
 */
function navRoutes (routes, filter) {
  if (!routes) {
    return []
  }

  return Object.keys(routes)
  .filter(key => !routes[key].hidden)
  .filter(key => filter(key, routes[key]))
  .map(key => {
    const route = routes[key]
    return {
      path: route.path || key,
      name: route.name,
      exact: route.exact,
      icon: route.icon,
      title: this.__(route.title)
      // ,subRoutes: walkRoutes.call(this, route.subRoutes, filter)
    }
  })
}
</script>

<style src="styles/app"></style>