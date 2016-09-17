<template>
  <div class='page-wrapper'>
	<c-pane>
	  <c-cell v-for='item in items'>
		<c-xsd-item :item='item' :click='showItem'>
	  		<div slot="right">
				<c-xsd-item-service :item="item"></c-xsd-item-service>
	 		</div>
		</c-xsd-item>
	  </c-cell>
	</c-pane>

	<c-pane v-if='!items || items.length==0' class="text-center">
	  <c-icon name='fa-dropbox' class="icon-background"></c-icon>
	  <h5 class="text-background">还没有代理产品？</h5>
	  <div class="p20">
	    <c-button class="primary" @click="newItem=true">添加代理产品</c-button>	
	  </div>
	</c-pane>

	<v-suppliers :toggle.sync="showSupplierModal"></v-suppliers>
  </div>
</template>


<script>
import Promise from 'nd-promise'
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem } from 'components'
import { mapGetters, mapActions } from 'vuex'
import CXsdItemService from '../item/c-item-service'
import VSuppliers from '../common/v-suppliers'


export default {
	data () {
		return { 
			showSupplierModal:0
		}
	},
	route: {
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('station/items').then( data => {
					this.setItems(data.items)
				} )			
			}

      		this.$root.setNavOptions([{
	    		icon:'material-add',
	    		click: ()=>{ this.showSupplierModal =1  }
	    	}])
	    	
			transition.next()
		}
	},
    computed: {
    	...mapGetters(['user', 'items']),
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      showItem(item){
      	this.$route.router.go({ name:'item', params:{ id: item.id } })  
      },
    },
	components: {
		CPane,
		CFrame,
		CCell,
		CIcon,
		CButton,
		CXsdItem,
		CXsdItemService,
		VSuppliers
	}
}
</script>