<template>
  <div :class="['c-xsd-nav-button', class]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src='styles/components/xsd-nav-button'></style>