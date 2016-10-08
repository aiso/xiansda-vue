<template>
  <div :class="['c-list-item', class]">
    <div v-if="icon">
      <c-icon :name="icon" class="block icon"></c-icon>
    </div>
    <slot name="thumbnail"></slot>
	  <div class="item-content">
	  	<h4 class="title">{{title}}</h4>
	  	<p v-if="!!subTitle" class="sub-title">{{subTitle}}</p>
	  </div>
    <div class="addition">
      <slot name="addition"></slot>
    </div>
    <div v-if="arrowRight">
      <c-icon name="material-chevron_right" class="block arrow-right"></c-icon>
    </div>
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
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    arrowRight: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CIcon,
  }
}
</script>

<style src="styles/components/list-item"></style>