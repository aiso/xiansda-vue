<template>
	<div>
	  <c-pane>
	  	<c-xsd-item v-for='item in supplierItems' :item='item'>
	  	</c-xsd-item>
	  </c-pane>
	</div>
</template>

<script>
import { CPane, CXsdItem } from 'components'
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
      }
    },
	components: {
		CPane,
		CXsdItem
	}
}
</script>