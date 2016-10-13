<template>
  <c-frame :toggle.sync="toggle" title="商品">
    <c-item-view v-if="item" :item='item'>
      <div class="text-center">
        <c-price :amount="item.amount" class="big c-red-dark"></c-price>
        <c-xsd-service :sid="item.service"></c-xsd-service>
      </div>
    </c-item-view>

    <m-cart :show.sync="showCart" :item="item"></m-cart>

    <c-xsd-nav-button>
      <a class="icon" @click="showCart=true"><c-icon name="material-shopping_cart" class="block"></c-icon></a> 
    </c-xsd-nav-button>
  </c-frame>
</template>

<script>
import { CFrame, CIcon, CPrice, CXsdNavButton, CXsdService } from 'components'
import CItemView from '../item/c-view'
import MCart from './m-cart'

export default {
  props : {
    toggle:{
      type:Number,
      twoWay:true
    },
    agent: {
      type: Object
    }
  },
  data () {
    return { 
      item:null,
      showCart:false,
    }
  },
  watch: {
    toggle(v){
      if(v > 0){
        if(!this.item || this.item.id != this.agent.item){
          this.xsd.item.get(this.agent.item).then(item=>{
            item.amount=parseFloat(item.price)+parseFloat(this.agent.fee)
            this.item = item
          })
        }
      }
    }
  },
  methods: {

  },
  components: {
    CFrame,
    CIcon,
    CPrice,
    CXsdNavButton,
    CXsdService,
    CItemView,
    MCart
  }  

}
</script>