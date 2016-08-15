<template>
  <div :class="['c-xsd-item', class]">
	  <c-image :src="item.img" class="thumbnail"></c-image>
	  <div class="xsd-content">
	  	<h5>{{item.title}}</h5>
	  	<slot></slot>	
	  </div>
	  
  </div>
</template>

<script>
import CImage from './c-image'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    item: {
    	type: Object
    }
  },
  components: {
    CImage
  }
}
</script>

<style src="styles/components/xsd-item"></style>
