<template>
  <div class='page-wrapper'>

    <div class='page-wrapper' v-el:wrapper :style="{ height: wrapperHeight + 'px' }">
      <ul v-iscroll="loadMore()" iscroll-disabled="loading" iscroll-distance="50">
        <li v-for="item in list" class="p20">
        	<a @click="viewItem=item.id"><c-xsd-item :item='item'></c-xsd-item></a>
        </li>
      </ul>
      <p v-show="loading">
        <c-loading>加载中...</c-loading>
      </p>
    </div>


	  <c-pane v-if='!items || items.length==0' class="text-center">
  		<c-icon name='fa-dropbox' class="icon-background"></c-icon>
  		<h5 class="text-background">还没有产品？</h5>
  		<div class="p20">
  			<c-button class="primary">添加产品</c-button>	
  		</div>
	  </c-pane>
	  <c-xsd-navbar title="我的产品">
	  	<div slot="right">
	  		<a @click="newItem=true"><c-icon name="material-add" class="block"></c-icon></a>
	  	</div>
	  </c-xsd-navbar>


	  <c-frame :toggle='newItem'>
	  	<v-item-edit :callback="editCallback" ></v-item-edit>	
	  </c-frame>

	  <c-frame :toggle='!!viewItem'>
	  	<v-item-view :itemid='viewItem' :callback="viewCallback"></v-item-view>
	  </c-frame>
  </div>
</template>



<script>
import { CPane, CFrame, CCell, CIcon, CButton, CXsdItem, CXsdNavbar, CLoading } from 'components'
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
			transition.next()
		}
	},
	data () {
		return { 
			newItem:false,
			viewItem:0,
			list: [],
			allLoaded: false,
	        loading: false,
	        wrapperHeight: 0			
		}
	},
    computed: {
    	...mapGetters(['auth', 'items']),
    	itemExt () {
    		return this.items.find( item => item.id==100009 )
    	}
    },
    methods: {
      ...mapActions(['setItems', 'addItem']),
      loadMore () {
      	if(this.allLoaded) return

        this.loading = true
        setTimeout(() => {
          const last = this.list.length
          for (let i = last; i < last+5 && i<this.items.length; i++) {
            this.list.push(this.items[i])
          }
          this.loading = false
          if(this.list.length >= this.items.length) this.allLoaded = true
        }, 1500)
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
    compiled() {
    	/*
    	console.log(this.items);
      for (let i = 0; i < 5; i++) {
        this.list.push(this.items[i])
      }*/
    },
    ready() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$els.wrapper.getBoundingClientRect().top
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
		CXsdNavbar,
		CLoading
	}
}
</script>