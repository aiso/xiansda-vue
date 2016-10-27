<template>
  <div class="xsd-header">
    <a v-for="route in routes" :link="{ name: route.name }"  class="nav">
      <c-icon :name="route.icon"></c-icon>
    </a>
    <a class="nav"><c-icon name="material-build"></c-icon></a>
    <a class="nav active"><c-icon name="material-home" ></c-icon></a>
  </div>
</template>


<script>
import { CIcon } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['navMainRoutes', 'navCurrRoute']),
    routes () {
      return this.navMainRoutes.routes
    },
  },
  components: {
    CIcon,
  }
}

</script>
