<template>
  <c-modal :show.sync='show' :callback='modalAction'>
    <div class="flex-row p20 border-bottom">
      <h2 class="flex-auto pr10 text-left">购物篮</h2>
      <div v-if="inCart">
        <a @click="removeItem"><c-icon name="material-delete_forever" class="block c-red"></c-icon></a>
      </div>
    </div>
    <div v-if="!!cartItem">
      <div class="table-row p10">
          <div class="span3">
              <span class="c-text-light">数量</span>
          </div>
          <div class="span9">
            <button class="float-right" @click="cartItem.quantity=cartItem.quantity+1"><c-icon name="material-add" class="block"></c-icon></button>
            <input class="float-right input-simple text-center font-montserrat" style="width:80px;line-height: 50px;font-size:16px" v-model="cartItem.quantity" />
            <button :disabled="cartItem.quantity<=1" class="float-right" @click="cartItem.quantity=cartItem.quantity-1"><c-icon name="material-remove" class="block"></c-icon></button>
          </div>
      </div>
      <div class="table-row p10">
          <div class="span3">
              <span class="c-text-light">金额</span>
          </div>
          <div class="span9 plr20 text-right">
            <span class="font-montserrat">{{item.amount | currency ''}}</span> x {{cartItem.quantity}} = <c-price :amount="item.amount*cartItem.quantity" class="c-red-dark big" style="display: inline-block"></c-price>
          </div>
      </div>
    </div>
  </c-modal>
</template>

<script>
import { CModal, CPrice, CIcon, CXsdImage } from 'components'
import { mapActions, mapGetters } from 'vuex'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    item:{
      type:Object
    }
  },
  data(){
    return{
      cartItem:null,
    }
  },
  computed:{
    ...mapGetters(['cart']),
    inCart(){
      return !!this.cart.find(i=>i.id == this.item.id)
    }
  },
  methods: {
    ...mapActions(['setCartItem', 'removeCartItem']),
    removeItem(){
      this.removeCartItem(this.item)
      this.show = false
    },
    modalAction(key){
      if(key=='submit'){
        this.setCartItem(this.cartItem)
      }
    }
  },
  watch:{
    show(val){
      if(val === true){
        this.cartItem = Object.assign({
          id:this.item.id,
          quantity:1
        }, this.cart.find(i=>i.id == this.item.id))
      }else{
        this.cartItem = null
      }
    }
  },
  components: {
    CModal,
    CPrice,
    CIcon,
    CXsdImage
  }
}
</script>


