<template>
  <div :class="['c-xsd-itext-h', class]">
    <div v-if="icon" class="text-right">
      <c-icon :name="icon" class="icon"></c-icon>  
    </div>
    <div v-if="title" class="text-left">
      <span class="title">{{title}}</span>  
    </div>
  </div>
</template>

<script>
  import CIcon from 'components/c-icon'

  export default {
    props: {
      class: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: null
      }
    },
    components: {
      CIcon
    }
  }
</script>

<style src='styles/components/xsd-itext-h'></style>