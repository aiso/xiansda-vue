<template>
  <div class='page-wrapper'>
	<c-pane>
	  <div class="list-item" v-for='item in listItems'>
	  	<c-xsd-item :item='item'>
	  		<div slot="right">
			  <c-button class="small" v-if="item.post==0" @click="postItem(item.id)">发布</c-button>
	  		</div>
	  	</c-xsd-item>
	  </div>
	</c-pane>

	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary">添加产品</c-button>	
  		</div>
	  </c-pane>

	  <c-frame :toggle.sync='newItem' :title="__('supplier.item.new')">
	  	<v-item-edit :callback="editCallback" ></v-item-edit>	
	  </c-frame>

	  <c-frame :toggle.sync='viewItem' :title="__('supplier.routes.items')">
	  	<v-item-view :itemid='viewItemId'></v-item-view>
	  </c-frame>

	  <v-item-post :show.sync="itemPostToggle"></v-item-post>

  </div>
</template>



<script>
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CLoading  } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VItemEdit from './v-item-edit'
import VItemView from './v-item'
import VItemPost from './v-item-post'

export default {
	route: {
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('supplier/items').then( data => {
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
			viewItemId:0,
			itemPostToggle:false
		}
	},
    computed: {
    	...mapGetters(['user', 'items']),
    	listItems(){
    		if(!this.items) return [];

    		return this.items.map(item=>{
    			return {
    				img:item.img,
    				post:item.post,
    				price:item.price,
    				button:{
    					title:item.title,
    					click:()=>{ this.showItem(item.id) }
    				}
    			}
    		})
    	}
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
      postItem(id){
      	this.itemPostToggle = true;
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
		VItemPost,
		CLoading
	}
}
</script>