<template>
  <div class='page-wrapper'>
    <div v-if="item">
      <c-swipe v-if="!!item.images && item.images.length" class='swipe' :auto="4000">
        <c-swipe-item v-for="image in item.images">
          <c-xsd-image :src='image.url' :width='slideWidth' height=200 style="overflow: visible"></c-xsd-image>
        </c-swipe-item>
      </c-swipe>
      <c-pane>
        <div class="table-row">
          <div class="extend">
            <h3>{{item.title}}</h3>  
          </div>
          <div class="pl10">
            <a class="ib p5 btn">
              <c-xsd-item-service :item="item" class="big"></c-xsd-item-service>  
            </a>
          </div>
          <div class="pl10">
            <c-xsd-service-action :item="item" class="big"></c-xsd-service-action>
          </div>
        </div>
      </c-pane>
      <c-pane>
        <p class="c-text-light">{{item.content}}</p>
      </c-pane>
    </div>

    <c-xsd-nav-button v-if="!!item && !!user && user.role==20" >
      <a class="icon" @click="deleteItem"><c-icon name="material-delete_forever" class="block"></c-icon></a>
      <a class="icon" v-link="{ name:'item/edit', params:{ id:item.id } }"><c-icon name="material-edit" class="block"></c-icon></a>  
    </c-xsd-nav-button>

  </div>
</template>

<script>
import { CPane, CButton, CIcon, CSwipe, CSwipeItem, CXsdImage, CXsdNavButton } from 'components'
import { mapActions, mapGetters } from 'vuex'

import CXsdItemService from './c-item-service'
import CXsdServiceAction from './c-service-action'

export default {
  data () {
    return { 
      slideWidth: 400,
      item:null
    }
  },
  attached () {
    this.slideWidth = this.$el.clientWidth
  },
  route: {
    data(transition){
      this.xsd.item.get(this.$route.params.id).then(item=>{
        transition.next({
          item
        })
      })
    },
    deactivate(transition){
      this.item = null
      transition.next()
    }
  },
  computed:{
    ...mapGetters(['user']),
  },
    methods: {
    	...mapActions(['removeItem', 'addItem', 'updateItem']),
      deleteItem () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.delete('item/'+this.item.id).then( () => {
            this.removeItem(this.item.id)
            history.back()
          } )
        } )
      }
    },
  components: {
    CPane,
    CButton,
    CIcon,
    CSwipe,
    CSwipeItem,
    CXsdNavButton,
    CXsdImage,
    CXsdItemService,
    CXsdServiceAction
  }
}
</script>

<style>
  .swipe {
      height: 200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
</style>