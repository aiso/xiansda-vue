<template>
  <component :is="'CItemService'+this.item.service" :item="item"></component>
</template>

<script>
import CItemService101 from '../s101/c-item-service'

export default {
  props: {
    item: {
      type: Object
    },
  },
  components:{
  	CItemService101,
  }
}

</script>