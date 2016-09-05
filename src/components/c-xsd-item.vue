<template>
  <div :class="['c-xsd-item', class]">
	  <c-xsd-image v-if="!!item.img" :src="item.img" class="thumbnail" width=50 height=50></c-xsd-image>
    <c-xsd-avatar v-if="!!item.avatar" :src="item.avatar" size=50></c-xsd-avatar>
	  <a class="xsd-content" @click="itemClick(item)">
	  	<h4 v-if="!!item.title" class="title">{{item.title}}</h4>
      <div class="subTitle">
        <slot name="subTitle"></slot> 
      </div>
	  </a>
    <slot name="right"></slot>
  </div>
</template>

<script>
import CXsdImage from './c-xsd-image'
import CXsdAvatar from './c-xsd-avatar'

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
  methods:{
    itemClick(item){
      if(typeof(item.click) == 'function')
        item.click()
    }
  },
  components: {
    CXsdImage,
    CXsdAvatar,
  }
}
</script>

<style src="styles/components/xsd-item"></style>