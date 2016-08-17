<template>
	<div>
		<c-xsd-header title="我的产品">
			<div slot="leftButton">
				<a @click="reload"><c-icon name="material-keyboard_backspace" class="block"></c-icon></a>
			</div>
			<div slot="rightButton">
				<a @click="newItem"><c-icon name="material-add" class="block"></c-icon></a>
			</div>
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
	   <item-edit class='frame' v-if='editItem>=0' :callback="editCallback" transition="right-in"></item-edit>
	</div>
</template>


<script>
import { CPane, CCell, CIcon, CButton, CXsdHeader, CXsdItem } from 'components'
import { mapGetters, mapActions } from 'vuex'
import ItemEdit from './item-edit'

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
	data () {
		return { editItem:-1 }
	},
    computed: {
    	...mapGetters(['auth', 'supplierItems']),
    	itemExt () {
    		return this.supplierItems.find( item => item.id==100009 )
    	}
    },
    methods: {
      ...mapActions(['setSupplierItems']),
      reload () {
      	console.log(this.itemExt.title)
      	//this.getSupplierItems()
      	//console.log(this.supplierItems);
      },
      newItem () {
      	this.editItem = 0;
      },
      editCallback (event, data) {
        if(event === 'close')
          this.editItem = -1;
        else{
          this.editItem = -1;
          console.log(event);
          console.log(data);
        }
      }
    },
	components: {
		CPane,
		CCell,
		CIcon,
		CButton,
		CXsdHeader,
		CXsdItem,
		ItemEdit
	}
}
</script>