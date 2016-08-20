<template>
  <div :class="['c-xsd-item', class]">
	  <c-xsd-image :src="item.img" class="thumbnail"></c-xsd-image>
	  <div class="xsd-content">
	  	<h4 class="title">{{item.title}}</h4>
	  	<slot>aa</slot>	
	  </div>
	  
  </div>
</template>

<script>
import CXsdImage from './c-xsd-image'
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
    CXsdImage,
    CImage
  }
}
</script>

<style src="styles/components/xsd-item"></style>