<template>
    <div :class="['c-xsd-header', class]">
      <slot></slot>
    </div>
</template>

<script>

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
  },

}
</script>

<style src='styles/components/xsd-header'></style>