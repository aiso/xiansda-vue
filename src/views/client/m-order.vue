<template>
  <div v-if="!!item">
    <component :show.sync="show" :is="'MOrder'+item.service" :item="item"></component>   
  </div>
</template>

<script>
import MOrder101 from '../s101/m-order'

export default {
  props: {
    item: {
      twoWay: true,
      type: Object,
      default:null
    }
  },
  data(){
    return {
      show:false
    }
  },
  watch:{
    show(val){
      if(val === false) this.item = null
    },
    item(val){
      this.show = !!val
    }
  },
  components:{
  	MOrder101
  }
}
</script>

