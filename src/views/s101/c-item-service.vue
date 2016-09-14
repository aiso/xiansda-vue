<template>
  <div class="text-center">
    <c-price :amount="item.params.price"></c-price>
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