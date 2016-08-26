<template>
  <div v-if="!!navigator">
    <div :class="['c-xsd-navbar', class]">
        <div class="c-xsd-navbar-button">
          <a @click="navigator.navButton.click" :class="{ 'active':navToggle }"><c-icon :name="navigator.navButton.icon" class="block"></c-icon></a>
        </div>
        <div class="extend">
          <h3 class="title">{{navigator.title}}</h3>
        </div>
        <div>
          <a v-for="option in navigator.navOptions" @click="option.click"><c-icon :name="option.icon" class="block"></c-icon></a>
        </div>
    </div>
    <c-xsd-menu :toggle.sync="navToggle" side="left" :items="navigator.mainItems"></c-xsd-menu>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import CXsdMenu from './c-xsd-menu'
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      navToggle:false,
      navStack:[],
      navigator:null
    }
  },
  computed: {
    ...mapGetters(['navMainRoutes', 'navCurrRoute']),
    lastNav(){
      return (this.navStack.length == 0)?null:this.navStack[this.navStack.length-1]
    },
  },
  methods: {
    pushNav(nav){
      this.navStack.push(this.navigator)
      this.navigator = Object.assign({ mainItems:[] } ,nav)
    },
    popNav(){
      this.navigator = this.navStack.pop()
    }
  },
  watch: {
    navCurrRoute(currentRoute){
      if(!currentRoute) {
        this.navigator = null
        return
      }

      const r = this.navMainRoutes.routes.find( route=>route.name==currentRoute.name )
      const navButton = { icon:(!!r)?r.icon:'material-home', click:()=>{ this.navToggle=!this.navToggle } }

      var routes = this.navMainRoutes.routes.filter( route => route.name!=this.$route.router._currentRoute.name );
      const mainItems = routes.map( route=>{
        return { title:this.__(route.title), icon:route.icon, click: ()=>{ 
          this.navToggle=false;
          this.$route.router.go({ name:route.name }) 
        } }
      })

      this.navigator = {
        title:this.title || this.__(currentRoute.title),
        navButton,
        mainItems
      }
    }
  },
  components: {
    CXsdMenu,
    CIcon
  }
}
</script>

<style src='styles/components/xsd-navbar'></style>