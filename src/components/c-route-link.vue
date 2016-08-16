<template>
  <a class="c-route-link" v-link="route.link">
    <c-icon v-if="route.icon" :name="route.icon"></c-icon>
    <h6 class="title">{{route.title}}</h6>
  </a>
</template>

<script>
import CIcon from 'components/c-icon'
export default {
  props: {
    route: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    CIcon
  }
}
</script>

<style src='styles/components/route-link'></style>