<template>
  <component :is="'CServiceAction'+this.item.service" :item="item" :user="user" :class="class"></component>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['user']),
  },
  components:{
  	CServiceAction101,
  }
}

</script>