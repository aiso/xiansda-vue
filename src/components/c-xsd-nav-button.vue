<template>
  <div :class="['c-xsd-nav-button', class]">
    <a @click="show=!show"><c-icon :name="btnName" class="block"></c-icon></a>
    <ul class="c-xsd-nav-routes" v-show="show">
      <li v-for="route in navRoutes" >
        <a class="link" @click="path(route.name)">
          <div>
            <c-icon :name="route.icon" class="block"></c-icon>
          </div>
          <div class="extend">
            <h4 class="title">{{route.title}}</h4>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
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
    }
  },
  methods: {
    path(name) {
      console.log(name);
      this.show=false;
      this.$route.router.go({ name });
    }

  },
  components: {
    CIcon
  }
}
</script>

<style src='styles/components/xsd-nav-button'></style>