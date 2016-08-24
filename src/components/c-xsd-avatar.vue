<template>
  <div :class="['c-xsd-avatar', class]">
    <c-xsd-image :src="img"></c-xsd-image>
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
      img: {
        type: String,
        default: 'images/avatar.jpg'
      }
    },
    components: {
      CXsdImage
    }
  }
</script>

<style src='styles/components/xsd-avatar'></style>