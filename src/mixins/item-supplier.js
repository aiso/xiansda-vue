import { mapActions } from 'vuex'

export default {
	props : {
		item : {
			type : Object,
			default : null
		}
	},
	activate (done) {
		if(this.item == null || this.item.id == 0 || !!this.item.supplierView){
			//this.sitem = this.item;
			done();
		}else{
			this.xsd.api.get('item/'+this.item.id).then( data => {
				data.item.supplierView = true;
				this.updateItem(data.item);
				this.item = data.item;
				done();
			} ).catch(this.$alert.error)
		}
	},
    methods: {
    	...mapActions(['updateItem'])
    },	
}