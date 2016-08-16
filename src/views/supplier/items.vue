<template>
	<div>
		<c-xsd-header title="我的产品">
			<a slot="leftButton">
				<c-icon name="material-arrow_back"></c-icon>
			</a>
			<a slot="rightButton" @click="test">
				<c-icon name="fa-user"></c-icon>
			</a>
		</c-xsd-header>
	  <c-pane>
		  <c-cell  v-for='item in supplierItems'>
		  	<c-xsd-item :item='item'></c-xsd-item>
		  </c-cell>
	  </c-pane>
	  <c-pane v-if='!supplierItems || supplierItems.length==0' class="text-center">
	  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
	  		<h5 class="text-background">还没有产品？</h5>
	  		<div class="p20">
	  			<c-button class="primary">添加产品</c-button>	
	  		</div>
	  </c-pane>
	</div>
</template>


<script>
import { CPane, CCell, CIcon, CButton, CXsdHeader, CXsdItem } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
	route: {
		activate (transition) {
			if(this.supplierItems == null){
				this.xsd.api.get('items?supplier='+this.auth.id).then( data => {
					this.setSupplierItems(data.items)
				} ).catch(this.$alert.error)				
			}
			transition.next()
		}
	},
    computed: {
    	...mapGetters(['auth', 'supplierItems']),
    },
    methods: {
      ...mapActions(['setSupplierItems']),
      reload () {
      	//this.getSupplierItems()
      	//console.log(this.supplierItems);
      },
      test () {
      	console.log('tttttt');
      }
    },
	components: {
		CPane,
		CCell,
		CIcon,
		CButton,
		CXsdHeader,
		CXsdItem
	}
}
</script>