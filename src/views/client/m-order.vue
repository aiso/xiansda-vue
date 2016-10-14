<template>
   <component :show.sync='show' :is="'MOrder'+item.service" :item="item" :agent="agent"></component>
</template>

<script>
import PropsItemAgent from 'mixins/props-item-agent'
import MOrder101 from '../s101/m-order'

export default {
  mixins: [PropsItemAgent],
  props: {
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    }
  },
  components:{
  	MOrder101
  }
}
</script>

