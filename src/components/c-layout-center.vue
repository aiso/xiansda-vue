<template>
  <div :class="['c-layout-center', class]">
	<div class="c-layout-center-content">
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
    }
  }
}
</script>

<style src="styles/components/layout-center"></style>
