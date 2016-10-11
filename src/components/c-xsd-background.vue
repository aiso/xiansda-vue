<template>
  <div :class="['c-xsd-background', class]">
    <c-icon :name="icon"></c-icon>
    <h2 class="title">{{title}}</h2>
    <p class="description">{{description}}</p>
    <slot></slot>
  </div>
</template>


<script>
import CIcon from 'components/c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'material-error_outline'
    },
    title: {
      type: String,
      default: '鲜时达'
    },
    description: {
      type: String,
      default: ''
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src='styles/components/xsd-background'></style>