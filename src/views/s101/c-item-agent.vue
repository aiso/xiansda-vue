<template>
  <div>
    <c-price :amount="cost" class="c-red big"></c-price>
    <c-xsd-service :sid="item.service"></c-xsd-service>
  </div>
</template>

<script>
import PropsItemAgent from 'mixins/props-item-agent'
import { CPrice, CXsdService } from 'components'

export default {
  mixins: [PropsItemAgent],
  data(){
  	return{
  		service:this.xsd.service.config(this.item.service),
  	}
  },
  computed: {
    cost(){
      return parseFloat(this.item.price)+parseFloat(this.agent.fee)
    }
  },
  components:{
  	CPrice,
    CXsdService
  }
}
</script>
