import { mapGetters, mapActions } from 'vuex'

export default {
	props : {
		itemid : {
			type : Number,
			default : 0
		}
	},
	computed: {
		...mapGetters(['items']),
		item() {
			console.log('itemid='+this.itemid);

			if(this.itemid == 0)
				return { id:0 }

			var item = this.items.find( i => i.id == this.itemid)
			if(!!item && !!item.supplierView)
				return item
			else{
				this.xsd.api.get('item/'+this.itemid).then( data => {
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