<template>
  <div :class="['c-modal-header', class]">
    <div>
      <c-icon v-if="icon" :name="icon"></c-icon>
      <c-xsd-image :src="image" width=50 height=50></c-xsd-image>
    </div>
    <div class="c-modal-header-content">
        <h3 class="title">{{title}}</h3>
        <p class="sub-title">{{subTitle}}</p>
    </div>
  </div>
</template>

<script>
import CIcon from 'components/c-icon'
import CXsdImage from 'components/c-xsd-image'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    icon: {
    	type: String,
      default:null
    },
    image: {
      type: String,
      default:null
    },
    title: {
      type: String,
      default: 'title'
    },
    subTitle: {
      type: String,
      default: null
    }
  },
  components: {
    CIcon,
    CXsdImage
  }
}
</script>

<style src="styles/components/modal-header"></style>

