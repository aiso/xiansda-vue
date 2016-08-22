<template>
  <div :class="['c-mask', class]" :style="{ z-index:zIndex }"
    tabindex="-1"
    transition="fade"><slot></slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    zIndex: {
    	type:Number,
    	default: 101
    }
  }
}
</script>

<style src="styles/components/mask"></style>
