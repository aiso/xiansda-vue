<template>
  <div :class="['c-item-service-101', class]">
    <c-price :amount="item.params.price" ></c-price>
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
  		service:this.xsd.service.cfg(this.item.service),
  	}
  },
  components:{
  	CIcon,
  	CPrice
  }
}
</script>

<style>
  .c-item-service-101{
    text-align: center;
  }

  .c-item-service-101.big .c-price-amount{
    font-size:24px;
  }
</style>