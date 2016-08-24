import { mapGetters, mapActions } from 'vuex'

export default {
	props : {
		itemid : {
			type : [Number, String],
			default : 0
		}
	},
	computed: {
		...mapGetters(['items']),
		item() {
			if(this.itemid == 0)
				return { id:0 }

			var item = this.items.find( i => i.id == this.itemid)
			if(!!item && !!item.supplierView)
				return item
			else{
				this.xsd.api.get('item/'+this.itemid+'?with=posts').then( data => {
					data.item.supplierView = true;
					this.updateItem(data.item);
				} )
			}
		}
	},
    methods: {
    	...mapActions(['updateItem']),
    	stopGetItem(){
    		const item = this.itemid
    		this.itemid = 0
    		return item
    	}
    },	
}