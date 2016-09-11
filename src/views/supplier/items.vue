<template>
  <div class='page-wrapper'>
	<c-pane>
	  <div class="list-item" v-for='item in listItems'>
	  	<c-xsd-item :item='item'>
	  		<div slot="right" class="pl10 valign-top">
			  <c-button class="small primary" v-if="item.post==0" @click="itemPostId=item.id">发布</c-button>
			  <a v-if="item.post" @click="itemPostId=item.id">
			  	<c-price :amount="item.price"></c-price>
			  </a>
	  		</div>
	  	</c-xsd-item>
	  </div>
	</c-pane>
	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary" @click="addItem">添加产品</c-button>	
  		</div>
	  </c-pane>
	  <c-modal-options :show.sync="newItem" :options="services" title="新建产品" sub-title="从下面选择新建的产品类型"></c-modal-options>


	  <c-frame :toggle.sync='viewItemId' :title="__('supplier.routes.items')">
	  	<v-item-view :itemid.sync='viewItemId'></v-item-view>
	  </c-frame>

	  <v-item-post :itemid.sync="itemPostId" ></v-item-post>

  </div>
</template>


<script>
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CLoading, CPrice, CModalOptions } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VItemView from './v-item'
import VItemPost from './v-item-post'

export default {
	data () {
		return { 
			newItem:false,
			viewItemId:0,
			postItem:null,
			itemPostId:0,
			services:null
		}
	},
	route: {
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('supplier/items').then( data => {
					this.setItems(data.items)
				} )			
			}

      		this.$root.setNavOptions([{
	    		icon:'material-add',
	    		click: this.addItem
	    	}])
	    	
			transition.next()
		}
	},
    computed: {
    	...mapGetters(['user', 'items']),
    	listItems(){
    		if(!this.items) return [];

    		return this.items.map(item=>{
    			return {
    				id:item.id,
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
      addItem(){
      	this.xsd.api.getCache('services').then(data=>{
      		this.services = this.services || data.services.map(service=>{
      			return{
	      			icon:service.icon,
	      			title:service.title,
	      			subTitle:service.info,
	      			click:()=>{ 
	      				this.newItem = false
	      				this.$route.router.go({ name:'s' + service.id + '/item/edit' }) 
	      			}
      			}
      		})
			this.newItem = true;
      	})
      },
      showItem(id){
      	this.viewItemId=id
      	//this.viewItem = true
      },
      editCallback (event, data) {
      	this.newItem = false;

      	if(event == 'add'){
      		this.addItem(data);
      	}
      }
    },
	components: {
		CPane,
		CFrame,
		CCell,
		CIcon,
		CButton,
		CXsdItem,
		VItemView,
		VItemPost,
		CLoading,
		CPrice,
		CModalOptions
	}
}
</script>