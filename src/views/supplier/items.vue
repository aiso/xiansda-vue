<template>
  <div class='page-wrapper'>
	<c-pane>
	  <div class="list-item" v-for='item in items'>
		<c-xsd-item :item='item'>
	  		<div slot="right">
	  			<a class="pl10 ib text-center nowrap" v-if="item.service==0" @click="addItemService(item)">
	  				<c-icon name="material-wifi"></c-icon>
	  				<h5>发布</h5>	
	  			</a>
	 		</div>
		</c-xsd-item>
	  </div>
	</c-pane>


	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary" @click="newItem=true">添加产品</c-button>	
  		</div>
	  </c-pane>
	  <c-modal-options :show.sync="showAddServiceModal" :options="optionServices" title="发布产品" sub-title="从下面选择发布类型"></c-modal-options>

  </div>
</template>


<script>
import Promise from 'nd-promise'

import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CLoading, CPrice, CModalOptions } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
	data () {
		return { 
			services:null,
			optionServices:null,
			showAddServiceModal:false,
			viewItemId:0,
			postItem:null,
			itemPostId:0
		}
	},
	route: {
		data(transition){
			this.xsd.api.getCache('services').then(data=>{
				transition.next({
					services:data.services
				})
			})
		},
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('supplier/items').then( data => {
					this.setItems(data.items)
				} )			
			}

      		this.$root.setNavOptions([{
	    		icon:'material-add',
	    		click: ()=>{ this.$route.router.go({ name:'item/new' })  }
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
    				title:item.title,
    				img:item.img,
    				post:item.post,
    				price:item.price,
    				service:this.services.find(s=>s.id==item.service),
    				click:()=>{ 
    					this.$route.router.go({ name:'s' + item.service + '/item', params:{ id:item.id } })  
    				}
    			}
    		})
    	}
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      addItemService(item){
		this.xsd.api.getCache('services').then(data=>{
			this.optionServices = data.services.map(service=>{
	  			return{
	      			icon:service.icon,
	      			title:service.title,
	      			subTitle:service.info,
	      			click:()=>{ 
	      				this.showAddServiceModal = false
	      				this.$route.router.go({ name:'s' + service.id + '/item/service', params:{ id:item.id } }) 
	      			}
	  			}
	  		})
	  		this.showAddServiceModal = true
		})

      },
      showItem(id){
      	this.viewItemId=id
      	//this.viewItem = true
      },
      editCallback (event, data) {
      	this.newItem = false;

      	if(event == 'add'){
      		
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
		CLoading,
		CPrice,
		CModalOptions,
	}
}
</script>