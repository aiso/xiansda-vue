<template>
  <div :class="['c-xsd-item', class]">
    <c-icon v-if="!!item.icon" :name="item.icon" class="block"></c-icon>
	  <c-xsd-image v-if="!!item.img" :src="item.img" class="thumbnail" width=50 height=50></c-xsd-image>
    <c-xsd-avatar v-if="!!item.avatar" :src="item.avatar" size=50></c-xsd-avatar>
	  <div class="xsd-content">
	  	<h4 v-if="!!item.title" class="title">{{item.title}}</h4>
      <div class="subTitle">
        <slot name="subTitle"></slot> 
      </div>
	  </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
import CIcon from './c-icon'
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
  components: {
    CIcon,
    CXsdImage,
    CXsdAvatar,
  }
}
</script>

<style src="styles/components/xsd-item"></style>