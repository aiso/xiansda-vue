<template>
  <div :class="['c-xsd-nav-button', class]" v-show="toggle" transition="right-in">
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
    toggle: {
    	type: Boolean,
    	default:false
    }
  },
  attached(){
	setTimeout(()=>{
		this.toggle=true
	}, 500);
  }
}
</script>

<style src='styles/components/xsd-nav-button'></style>