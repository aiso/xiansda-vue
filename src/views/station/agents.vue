<template>
  <div class='page-wrapper'>

	<c-cell v-for='agent in agents'>
	  <c-xsd-item :item='agent.item' @click='showAgent=agent.id'>
	  	<div slot="detail" class="mt5">
	  		<c-xsd-profile :uid="agent.item.user"></c-xsd-profile>
	  	</div>
		<div slot="right" class="pl10 valign-top text-center">
			<c-price :amount="agent.fee"></c-price>
			<h5 class="c-text-light">代理费</h5>
		</div>
	  </c-xsd-item>
	</c-cell>

	<c-xsd-background v-if="agents.length==0" title="还没有代理产品？">
	  <div class="p20">
	    <c-button class="primary" @click="showSupplierModal=1">添加代理产品</c-button>	
	  </div>
	</c-xsd-background>

	<v-suppliers :toggle.sync="showSupplierModal" @callback="selectSupplier"></v-suppliers>
	<c-frame :toggle.sync="showAgent">
		<v-agent :agent="agent" @mutate="mutate"></v-agent>
	</c-frame>
  </div>
</template>


<script>
import Promise from 'nd-promise'
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CXsdImage, CXsdBackground, CPrice, CXsdProfile } from 'components'
import { mapGetters, mapActions } from 'vuex'
import CXsdItemService from '../item/c-item-service'
import VSuppliers from '../common/v-suppliers'
import VAgent from './v-agent'


export default {
	data () {
		return { 
			agents:[],
			showSupplierModal:0,
			showAgent:0
		}
	},
	route: {
		activate (transition) {
			this.xsd.api.getCache('station/agents').then( data => {
				this.agents = data.agents
			} )			

      		this.$root.setNavOptions([{
	    		icon:'material-add',
	    		click: ()=>{ this.showSupplierModal =1  }
	    	}])
	    	
			transition.next()
		}
	},
    computed: {
    	...mapGetters(['user', 'items']),
    	agent(){
    		return (this.showAgent)?this.agents.find(a=>a.id==this.showAgent):null
    	}
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      mutate(event, data){
      	if(event == 'deleteAgent'){
      		this.agents = this.agents.filter(agent=>agent.id!=data)
      		this.showAgent = 0
      	}
      },
      selectSupplier(id){
      	this.showSupplierModal = 0
      }
    },
	components: {
		CPane,
		CFrame,
		CCell,
		CIcon,
		CButton,
		CXsdItem,
		CXsdImage,
		CXsdItemService,
		VSuppliers,
		VAgent,
		CXsdBackground,
		CPrice,
		CXsdProfile
	}
}
</script>