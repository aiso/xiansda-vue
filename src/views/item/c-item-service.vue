<template>
  <component :is="'CItemService'+this.item.service" :item="item" :class="class"></component>
</template>

<script>
import CItemService101 from '../s101/c-item-service'

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
  	CItemService101,
  }
}

</script>