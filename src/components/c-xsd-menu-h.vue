<template>
  <div :class="['c-xsd-menu-h', class]"  v-if="menu.show" transition="bottom-in">
    <a class="light" @click="item.click" v-for="item in menu.items">
      <c-xsd-itext-h :title="item.title" :icon="item.icon" class="horizon"></c-xsd-itext-h>
    </a>
  </div>
</template>

<script>
  import CXsdItextH from 'components/c-xsd-itext-h'

  export default {
    props: {
      class: {
        type: String,
        default: null
      },
      menu: {
        type: Object,
        default: {}
      },
    },
    components: {
      CXsdItextH
    }
  }
</script>

<style src='styles/components/xsd-menu-h'></style>