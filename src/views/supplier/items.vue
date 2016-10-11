<template>
  <div class='page-wrapper'>
	<c-pane>
	  <c-cell v-for='item in items'>
		<c-xsd-item :item='item' @click="onShowItem(item.id)">
	  		<div slot="right" class="valign-top">
				<c-xsd-item-service :item="item"></c-xsd-item-service>
	 		</div>
		</c-xsd-item>
	  </c-cell>
	</c-pane>
	<c-xsd-background v-if="items.length==0" title="还没有产品？">
  		<div class="p20">
  			<c-button class="primary" v-link="{ name:'item/new' }">添加产品</c-button>	
  		</div>
	</c-xsd-background>

	<c-frame :toggle.sync="showItem">
	  <v-item @mutate="mutate"></v-item>
	</c-frame>
	<c-frame :toggle.sync="editItem">
	  <v-item-edit :item-id="editItem" @mutate="mutate"></v-item-edit>
	</c-frame>
  </div>
</template>


<script>
import Promise from 'nd-promise'
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CXsdBackground } from 'components'
import { mapGetters, mapActions } from 'vuex'
import CXsdItemService from '../item/c-item-service'
import VItemEdit from '../item/v-edit'
import VItem from './v-item'


export default {
	data () {
		return { 
			showItem:0,
			editItem:0
		}
	},
	route: {
		activate(transition){
      		this.$root.setNavOptions([{
	    		icon:'material-add',
	    		click: ()=>{ this.$route.router.go({ name:'item/new' })  }
	    	}])

	    	if(this.items.length == 0){
				this.xsd.api.get('supplier/items').then( data => {
					this.setItems(data.items)
					transition.next()
				} )	
	    	}else
      			transition.next()
		}
	},
    computed: {
    	...mapGetters(['user', 'items', 'activityItem']),
    },
    methods: {
      ...mapActions(['setItems', 'addItem', 'removeItem', 'setActivityItem']),
      onShowItem(id){
      	if(!!this.activityItem && this.activityItem.id == id)
      		this.showItem = 1
      	else{
	      this.xsd.item.get(id).then(item=>{
	      	this.setActivityItem(item)
	      	this.showItem = 1
	      })
      	}

      },
      mutate(event, data){
      	if(event == 'delete'){
	      this.$confirm.open('你确定要删除此产品？').then( () => {
	        this.xsd.api.delete('item/'+data).then( () => {
	        	this.showItem = 0
	        	this.removeItem(data)
	        } )
	      } )
      	}else if(event == 'edit'){
      	  this.editItem = data
      	  //this.$route.router.go({ name:'item/edit', params: { id: data } })
      	}else if(event == 'editCallback'){
      		this.editItem = 0
      	}
      }
    },
	components: {
		VItemEdit,
		VItem,
		CPane,
		CFrame,
		CCell,
		CIcon,
		CButton,
		CXsdItem,
		CXsdItemService,
		CXsdBackground
	}
}
</script>