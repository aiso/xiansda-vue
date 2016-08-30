<template>
  <div class='page-wrapper'>

	  <c-pane>
		  <c-cell v-for='item in items'>
		  	<a @click="showItem(item.id)"><c-xsd-item :item='item'></c-xsd-item></a>
		  </c-cell>
	  </c-pane>

	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary">添加产品</c-button>	
  		</div>
	  </c-pane>

	  <c-frame :toggle.sync='newItem'>
	  	<v-item-edit :callback="editCallback" ></v-item-edit>	
	  </c-frame>

	  <c-frame :toggle.sync='viewItem' :title="__('supplier.routes.items')">
	  	<v-item-view :itemid='viewItemId' :callback="viewCallback"></v-item-view>
	  </c-frame>
  </div>
</template>



<script>
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CLoading } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VItemEdit from './v-item-edit'
import VItemView from './v-item'

export default {
	route: {
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('items?supplier='+this.auth.id).then( data => {
					this.setItems(data.items)
				} )			
			}

	    	this.$navbar.setNavOptions([{
	    		icon:'material-add',
	    		click: ()=>{this.newItem=true}
	    	}])
	    	
			transition.next()
		}
	},
	data () {
		return { 
			newItem:false,
			viewItem:false,
			viewItemId:0
		}
	},
    computed: {
    	...mapGetters(['auth', 'items']),
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      showItem(id){
      	this.viewItemId=id
      	this.viewItem = true
      },
      editCallback (event, data) {
      	this.newItem = false;

      	if(event == 'add'){
      		this.addItem(data);
      	}
      },
      viewCallback (event, data) {
      	this.viewItem = 0;
      }
    },
	components: {
		CPane,
		CFrame,
		CCell,
		CIcon,
		CButton,
		CXsdItem,
		VItemEdit,
		VItemView,
		CLoading
	}
}
</script>