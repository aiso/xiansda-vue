<template>
  <c-frame :toggle.sync="toggle" title="商品">
    <c-item-view v-if="item" :item='item'></c-item-view>
    <c-xsd-nav-button>
      <a class="icon" @click="cartModal"><c-icon name="material-shopping_cart" class="block"></c-icon></a> 
      <a class="icon" @click="toggleFavorite"><c-icon :name="hasFavorite?'material-favorite':'material-favorite_border'" class="block"></c-icon></a>  
    </c-xsd-nav-button>
  </c-frame>
</template>

<script>
import { CFrame, CIcon, CXsdNavButton } from 'components'
import CItemView from '../item/c-view'

export default {
  props : {
    toggle:{
      type:Number,
      twoWay:true
    },
    itemid: {
      type: Number
    }
  },
  data () {
    return { 
      item:null,
    }
  },
  watch: {
    toggle(v){
      if(v > 0){
        if(!this.item || this.item.id != this.itemid){
          this.xsd.item.get(this.itemid).then(item=>{
            this.item = item
          })
        }
      }
    }
  },
  components: {
    CFrame,
    CIcon,
    CXsdNavButton,
    CItemView
  }  

}
</script>