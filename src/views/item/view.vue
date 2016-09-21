<template>
  <div class='page-wrapper'>
    <div v-if="item">
      <c-pane v-if="!!user">
        <c-xsd-service-action :item="item" class="text"></c-xsd-service-action>  
      </c-pane>
      <c-swipe v-if="!!item.images && item.images.length" class='swipe border-top' :auto="4000">
        <c-swipe-item v-for="image in item.images">
          <c-xsd-image :src='image.url' :width='slideWidth' height=200 style="overflow: visible"></c-xsd-image>
        </c-swipe-item>
      </c-swipe>
      <c-pane>
        <div class="table-row">
          <div class="extend">
            <h3>{{item.title}}</h3>  
          </div>
        </div>
      </c-pane>
      <c-pane>
        <p class="c-text-light">{{item.content}}</p>
      </c-pane>

      <c-xsd-nav-button v-if="!!user && user.role==20">
        <a class="icon"
          @click="deleteItem">
            <c-icon name="material-delete_forever" class="block"></c-icon>
        </a>
        <a class="icon" 
          v-link="{ name:'item/edit', params:{ id:item.id } }">
            <c-icon name="material-edit" class="block"></c-icon>
        </a>
      </c-xsd-nav-button>

      <c-xsd-nav-button v-if="!!user && user.role==10">
        <a class="icon" v-if="!hasFavorite" @click="addFavorite">
            <c-icon name="material-favorite_border" class="block"></c-icon>
        </a>
        <a class="icon" v-if="!!hasFavorite" @click="removeFavorite">
            <c-icon name="material-favorite" class="block c-orange"></c-icon>
        </a>
      </c-xsd-nav-button>

    </div>



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
    ...mapGetters(['user','favorites']),
    hasFavorite(){
      return this.favorites.findIndex(i=>i==this.item.id)>=0
    }
  },
  methods: {
  	...mapActions(['removeItem', 'addItem', 'updateItem', 'setFavorites', 'addToast']),
    deleteItem () {
      this.$confirm.open('你确定要删除此产品？').then( () => {
        this.xsd.api.delete('item/'+this.item.id).then( () => {
          this.removeItem(this.item.id)
          history.back()
        } )
      } )
    },
    addFavorite(){
      this.xsd.api.post('favorite', { item:this.item.id }).then(data=>{
        const favorites = this.favorites.slice(0)
        favorites.push(this.item.id)
        this.setFavorites(favorites)
        this.addToast('收藏成功')
      })
    },
    removeFavorite(){
      this.xsd.api.delete('favorite/'+this.item.id).then(data=>{
        const favorites = this.favorites.slice(0)
        const idx = favorites.findIndex(i=>i==this.item.id)
        favorites.splice(idx,1)
        this.setFavorites(favorites)
        this.addToast('您已取消收藏')
      })
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