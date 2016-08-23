<template>
  <div>
    <c-mask @touchend.prevent="toggle = false" transition="fade" v-if="toggle" style="z-index:9;background: rgba(255, 255, 255, 0.8);"></c-mask>
    <div :class="['c-xsd-menu', side]"  v-if="toggle" transition="bottom-in">
      <a @click="item.click" :class="['c-xsd-menu-item', side]" v-for="item in items">
        <div class="icon"><c-icon :name="item.icon" class="block"></c-icon></div>
        <h4 class="title">{{item.title}}</h4>
      </a>
    </div>
  </div>
</template>

<script>
import CMask from 'components/c-mask'
import CIcon from 'components/c-icon'

  export default {
    props: {
      side: {
        type: String,
        default: 'right'
      },
      toggle: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: []
      },
    },
    components: {
      CMask,
      CIcon
    }
  }

</script>

<style src='styles/components/xsd-menu'></style>