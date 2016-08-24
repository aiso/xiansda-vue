<template>
  <div>
    <div :class="['c-xsd-navbar', class]">
        <div class="c-xsd-navbar-button">
          <slot name="left"></slot>
          <a v-if="type=='main'" @click="navToggle=!navToggle" :class="{ 'active':navToggle }"><c-icon :name="btnName" class="block"></c-icon></a>
        </div>
        <div class="extend">
          <h3 class="title">{{navTitle}}</h3>
        </div>
        <div>
          <slot name="right"></slot>
        </div>
    </div>
    <c-xsd-menu :toggle.sync="navToggle" side="left" :items="navItems"></c-xsd-menu>
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
    type: {
      type: String,
      default: 'main'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      navToggle:false
    }
  },
  computed: {
    ...mapGetters(['navigator']),
    btnName () {
      const r = this.navigator.routes.find( route=>route.name==this.$route.router._currentRoute.name )
      return (!!r)?r.icon:'material-home'
    },
    navTitle () {
      if(!!this.title) return this.title

      const r = this.navigator.routes.find( route=>route.name==this.$route.router._currentRoute.name )
      return (!!r)?this.__(r.title):''
    },
    navItems () {
      var routes = this.navigator.routes.filter( route => route.name!=this.$route.router._currentRoute.name );

      return routes.map( route=>{
        return { title:this.__(route.title), icon:route.icon, click: ()=>{ 
          this.navToggle=false;
          this.$route.router.go({ name:route.name }) 
        } }
      })
    },
  },
  components: {
    CXsdMenu,
    CIcon
  }
}
</script>

<style src='styles/components/xsd-navbar'></style>