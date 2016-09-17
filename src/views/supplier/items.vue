<template>
  <div class='page-wrapper'>
	<c-pane>
	  <c-cell v-for='item in items'>
		<c-xsd-item :item='item' :click='showItem'>
	  		<div slot="right">
	  			<a class="pl10 ib text-center nowrap" v-if="item.service==0" @click="itemService(item)">
	  				<c-icon name="material-wifi"></c-icon>
	  				<h5>发布</h5>	
	  			</a>
	  			<a v-if="item.service>0" class="pl10 ib" @click="itemService(item)">
	  				<c-xsd-item-service :item="item"></c-xsd-item-service>
	  			</a>
	 		</div>
		</c-xsd-item>
	  </c-cell>
	</c-pane>

	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary" @click="newItem=true">添加产品</c-button>	
  		</div>
	  </c-pane>
	  <c-modal-options 
	  	:show.sync="showAddServiceModal" 
	  	:options="optionServices" 
	  	title="发布产品" 
	  	sub-title="从下面选择发布类型">
  	  </c-modal-options>

  </div>
</template>


<script>
import Promise from 'nd-promise'
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CModalOptions } from 'components'
import { mapGetters, mapActions } from 'vuex'
import CXsdItemService from '../item/c-item-service'

export default {
	data () {
		return { 
			optionServices:null,
			showAddServiceModal:false,
			viewItemId:0,
			postItem:null,
			itemPostId:0
		}
	},
	route: {
		activate (transition) {
			if(this.items == null){
				this.xsd.api.get('supplier/' + user.id +'/items').then( data => {
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
    				price:item.price,
    				service:this.xsd.service.cfg(item.service),
    				click:()=>{ 
    					this.$route.router.go({ name:'s' + item.service + '/item', params:{ id:item.id } })  
    				}
    			}
    		})
    	}
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      itemService(item){
      	if(item.service == 0){
			this.optionServices = this.xsd.service.all().map(service=>{
	  			return{
	      			icon:service.config.icon,
	      			title:service.config.title,
	      			subTitle:service.config.info,
	      			click:()=>{ 
	      				this.showAddServiceModal = false
	      				this.$route.router.go(service.routeItemService(item.id)) 
	      			}
	  			}
	  		})
	  		this.showAddServiceModal = true
      	}else{
      		this.$route.router.go(this.xsd.service.get(item.service).routeItemService(item.id)) 
      	}
      },
      showItem(item){
      	this.$route.router.go({ name:'item', params:{ id: item.id } })  
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
		CModalOptions,
		CXsdItemService
	}
}
</script>