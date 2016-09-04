<template>
  <div :class="['c-xsd-navigator', class]">
    <div class="c-xsd-navigator-button">
      <slot name="navButton"></slot>
    </div>
    <slot></slot>
    <div class="extend">
      <h3 class="title">{{title}}</h3>
    </div>
    <slot name="navOptions"></slot>
  </div>
</template>


<script>
import CIcon from './c-icon'
import CButton from './c-button'

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
  components: {
    CIcon,
    CButton
  }
}
</script>

<style src='styles/components/xsd-navigator'></style>