import { mapGetters, mapActions } from 'vuex'

export default {
	props : {
		itemId : {
			type : [Number],
			default : 0
		}
	},
	computed: {
		...mapGetters(['items']),
		item() {
			if(this.itemId == 0)
				return { id:0 }

			var item = this.items.find( i => i.id == this.itemId)
			if(!!item && !!item.supplierView)
				return item
			else{
				this.xsd.api.get('item/'+this.itemId).then( data => {
					data.item.supplierView = true;
					this.updateItem(data.item);
				} )
			}
		}
	},
    methods: {
    	...mapActions(['updateItem'])
    },	
}