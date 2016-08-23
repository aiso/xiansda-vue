<template>
  <div>
    <div :class="['c-xsd-nav-button', class]">
      <a @click="menu.show=!menu.show" :class="{ 'active':menu.show }"><c-icon :name="btnName" class="block"></c-icon></a>
    </div>
    <c-xsd-menu :menu="menu"></c-xsd-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CIcon from './c-icon'
import CMask from './c-mask'
import CXsdMenu from './c-xsd-menu'

export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu: {
        show:false,
        items:[]
      },      
    }

  },
  computed: {
    ...mapGetters(['navigator']),
    btnName () {
      const r = this.navigator.routes.find( route=>route.name==this.$route.router._currentRoute.name )
      return (!!r)?r.icon:'material-home'
    },
    navRoutes () {
      return this.navigator.routes.filter( route => route.name!=this.$route.router._currentRoute.name )
    },
  },
  methods: {
    path(name) {
      console.log(name);
      this.show=false;
      this.$route.router.go({ name });
    }

  },
  components: {
    CIcon,
    CMask,
    CXsdMenu
  }
}
</script>

<style src='styles/components/xsd-nav-button'></style>