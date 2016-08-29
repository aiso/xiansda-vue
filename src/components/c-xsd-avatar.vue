<template>
  <div :class="['c-xsd-avatar', class]">
    <c-xsd-image :src="img" :width="size" :height="size"></c-xsd-image>
  </div>
</template>

<script>
  import CXsdImage from 'components/c-xsd-image'

  export default {
    props: {
      class: {
        type: String,
        default: null
      },
      size: {
        type: [Number, String],
        default: 80
      },
      src: {
        type: String,
        default: ''
      }
    },
    computed:{
      img () {
        return this.src||'images/avatar.jpg'
      }
    },
    components: {
      CXsdImage
    }
  }
</script>

<style src='styles/components/xsd-avatar'></style>