<template>
  <div :class="['c-label-text', class]">
    <h4 class="label">{{label}}</h4>
    <div class="text">
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/label-text"></style>
