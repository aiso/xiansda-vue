<template>
  <div :class="['c-frame', class]" v-if='toggle' transition="right-in">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    toggle:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style src="styles/components/frame"></style>
