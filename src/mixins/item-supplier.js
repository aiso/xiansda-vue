import { mapGetters, mapActions } from 'vuex'
import Promise from 'nd-promise'

export default {
	computed: {
		...mapGetters(['items']),
	},
    methods: {
    	...mapActions(['updateItem']),
    	getStoreItem(id){
    		return this.items.find( i => i.id == id)
    	},
    	getSupplierItem(id){
    		const item = this.getStoreItem(id)
			if(!!item && !!item.supplierView)
				return Promise.resolve(item)
			else{
				return this.xsd.api.get('item/'+id+'?with=images').then( data => {
					data.item.supplierView = true;
					this.updateItem(data.item);
					return data.item
				} )
			}
    	}
    },	
}