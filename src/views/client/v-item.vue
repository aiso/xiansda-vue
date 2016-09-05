<template>
  <div class='page-wrapper'>
    <v-item v-if="item" :item='item'></v-item>
    <c-xsd-nav-button>
      <a class="icon" @click="cartModal"><c-icon name="material-shopping_cart" class="block"></c-icon></a> 
      <a class="icon" @click="toggleFavorite"><c-icon :name="hasFavorite?'material-favorite':'material-favorite_border'" class="block"></c-icon></a>  
    </c-xsd-nav-button>
    <m-cart :show.sync="showCart" :item="item"></m-cart>

  </div>
</template>

<script>
import { CPane, CButton, CIcon,CListItem, CFrame, CXsdNavButton } from 'components'
import { mapActions, mapGetters } from 'vuex'
import VItem from '../common/v-item'
import MCart from './m-cart'

export default {
  data () {
    return { 
      item:null,
      showCart:false
    }
  },
  props : {
    itemid: {
      type: Number,
      twoWay: true
    }
  },
  computed: {
    ...mapGetters(['profile']),
    hasFavorite(){
      return (this.profile.favorites.findIndex(item=>item==this.itemid)>=0)
    }

  },
  ready(){
    this.xsd.item.get(this.itemid).then(item=>{
      this.item = item
    })

  },
  methods: {
    ...mapActions(['addToast', 'setProfile']),
    toggleFavorite(){
      if(this.hasFavorite){
        this.xsd.api.delete('favorite/'+this.itemid).then(data=>{
          const favorites = this.profile.favorites.filter(item=>item!=this.itemid)
          this.setProfile(Object.assign({ }, this.profile, { favorites }))
          this.addToast({ message:'您已取消收藏' });
        })
      }else{
        this.xsd.api.post('favorite', { item:this.itemid }).then(data=>{
          const favorites = this.profile.favorites.slice(0)
          favorites.push(this.itemid)
          this.setProfile(Object.assign({ }, this.profile, { favorites }))
          this.addToast({ message:'您已成功收藏' });
        })
      }
    },
    cartModal(){
      this.showCart = true
    }

  },
  components: {
    MCart,
    CPane,
    CButton,
    CIcon,
    CListItem,
    VItem,
    CFrame,
    CXsdNavButton
  }
}
</script>