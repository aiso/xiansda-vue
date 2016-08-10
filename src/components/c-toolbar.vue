<template>
  <div :class="['c-toolbar', class]">
    <button class="btn"
      type="button">
        <icon name="fa-thumbs-up"></icon>
    </button>
  	<h1 class="title">{{title}}</h1>
  	<slot></slot>
  </div>
</template>

<script>
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    title:{
    	type:String,
    	default: ''
    }
  },
  components: {
    CIcon,
    "icon": require("vue-icons")
  }
}
</script>

<style src="styles/components/toolbar"></style>
