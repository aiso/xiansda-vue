<template>
  <c-modal :show.sync='show' :callback='modalAction'>
    <div class="table-row p10">
      <div class="extend text-left pl20">
        <h2>购物篮</h2>
      </div>
      <div>
        <c-icon name="material-shopping_cart" class="block c-text-light"></c-icon>
      </div>
    </div>
    <div v-if="!!cartItem">
      <div class="table-row p10">
          <div class="span3">
              <span class="c-gray-light">数量</span>
          </div>
          <div class="span9">
            <button class="float-right" @click="cartItem.quantity=cartItem.quantity+1"><c-icon name="material-add" class="block"></c-icon></button>
            <input class="float-right input-simple text-center font-montserrat" style="width:80px;line-height: 50px;font-size:16px" v-model="cartItem.quantity" />
            <button :disabled="cartItem.quantity<=1" class="float-right" @click="cartItem.quantity=cartItem.quantity-1"><c-icon name="material-remove" class="block"></c-icon></button>
          </div>
      </div>
      <div class="table-row p10">
          <div class="span3">
              <span class="c-gray-light">金额</span>
          </div>
          <div class="span9 plr20 text-right">
            <span>{{cartItem.price | currency ''}}</span> x {{cartItem.quantity}} = <c-price :amount="cartItem.price*cartItem.quantity" style="display: inline-block"></c-price>
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
      cartItem:null
    }
  },
  computed:{
    ...mapGetters(['cart']),
  },
  methods: {
    ...mapActions(['setCartItem']),
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
          price:this.item.price,
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


