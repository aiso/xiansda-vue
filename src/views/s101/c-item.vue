<template>
  <a v-link="{ name: 's101/item', params: { id: item.id }}">
  	<c-xsd-item :item='item'>
  		<div slot="subTitle"><c-price :amount="item.sItem.price"></c-price></div>
  		<div slot="right" class="pl10 text-center nowrap">
			<c-icon :name="service.icon" class="c-text-light" v-if="service"></c-icon>
 		</div>
  	</c-xsd-item>
  </a>
</template>

<script>
import { CXsdItem, CIcon, CPrice } from 'components'

export default {
  props: {
    item: {
      type: Object
    },
  },
  data(){
  	return{
  		service:null,
  	}
  },
  ready(){
  	this.xsd.api.getCache('services').then(data=>{
  		this.service = data.services.find(s=>s.id==this.item.service)
  	})
  },
  components:{
  	CXsdItem,
  	CIcon,
  	CPrice
  }
}

</script>