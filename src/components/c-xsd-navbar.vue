<template>
    <div :class="['c-xsd-navbar', class]">
        <div class="c-xsd-navbar-button">
          <slot name="left"></slot>
          <c-xsd-nav-button v-if="type=='main'"></c-xsd-nav-button>
        </div>
        <div class="extend">
          <h3 class="title">{{title}}</h3>
        </div>
        <div>
          <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import CXsdNavButton from './c-xsd-nav-button'
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
  components: {
    CXsdNavButton
  }
}
</script>

<style src='styles/components/xsd-navbar'></style>