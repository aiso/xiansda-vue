<template>
  <div :class="['c-item-service', class]">
    <c-price :amount="item.price" class="c-red"></c-price>
    <span class="i-text small nowrap text-small c-text-light"><c-icon :name="service.icon"></c-icon>{{service.title}}</span>
  </div>
</template>

<script>
import { CIcon, CPrice } from 'components'

export default {
  props: {
    item: {
      type: Object
    },
    class: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      service:this.xsd.service.config(this.item.service),
    }
  },
  components:{
    CIcon,
    CPrice
  }
}
</script>

<style>
  .c-item-service{
    text-align: center;
  }

  .c-item-service.big .c-price-amount{
    font-size:24px;
  }
</style>