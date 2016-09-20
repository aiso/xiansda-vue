<template>
  <component :is="'CServiceAction'+this.item.service" :item="item" :class="class"></component>
</template>

<script>
import CServiceAction101 from '../s101/c-action'

export default {
  props: {
    item: {
      type: Object
    },
    class: {
      type: String,
      default:''
    },
  },
  components:{
  	CServiceAction101,
  }
}

</script>