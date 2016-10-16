<template>
  <div class="page-wrapper bg-gray-light">
    <c-xsd-background v-if="items.length==0" :statement="loading" title="饥肠辘辘啊" icon="fa-shopping-basket"></c-xsd-background>
    <div v-if="items.length">
      <div class="flex-row" style="padding:20px 20px 0">
        <h2 class="text-ls">购物篮</h2>  
        <a class="c-red btn" @click="removeCart"><c-icon name="material-remove_shopping_cart" class="block"></c-icon></a>
        <div class="flex-auto"></div>
      </div>
      <c-xsd-item v-for="item in items" :item="item" class="bg-white list-item border-bottom" @xsd-item-click="editItem">
        <div slot="detail">
          <span class="font-montserrat">{{item.quantity}} x {{item.amount|currency ''}} = </span><c-price :amount="item.amount*item.quantity" class="ib c-red"></c-price>
        </div>
        <div slot="right">
          <a @click="item.checked=!item.checked"><c-icon :name="item.checked?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
        </div>
      </c-xsd-item>

      <div class="flex-row pl20">
        <div class="flex-auto"></div>
        <span class="c-text-light">全选</span>
        <a @click="allCheck"><c-icon :name="summary.allCheck?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>

      <c-xsd-nav-button style="width:15rem">
        <div class="p10 float-right">
          <c-submit class="primary small" :submit="postCart" :disabled="summary.count==0" label='结算'></c-submit>  
        </div>
        <div class="float-right text">
          <c-price :amount="summary.amount" class="c-red big"></c-price>  
        </div>
        <div class="float-right text c-text-light">
          合计：
        </div>
      </c-xsd-nav-button>

      <m-order :item.sync="cartItem"></m-order>
    </div>
  </div>
</template>

<script>
import { CPane, CIcon, CXsdItem, CPrice, CXsdBackground, CXsdNavButton, CSubmit } from 'components'
import { mapActions, mapGetters } from 'vuex'
import MOrder from './m-order'

export default {
  data(){
  	return{
      loading:{
        icon:'material-hourglass_empty',
        title: '努力加载中...'
      },
  		items:[],
      showModal:false,
      cartItem:null
  	}
  },
  attached(){
    if(this.cart.length == 0){
      this.loading = null
    }else{
      this.xsd.api.post('client/cart/check', this.cart).then(data=>{
        this.items = data.items.map(item=>{
          return Object.assign({ checked:false, amount:parseFloat(item.price)+parseFloat(item.agent.fee) }, item)
        })

        if(this.cart.length != data.items.length){
          const cart = data.items.map(item=>{
            return { id:item.id, quantity:item.quantity }
          })
          this.setCart(cart)
        }
        this.loading = null
      })
    }
    
  },
  computed: {
  	...mapGetters(['cart']),
    summary(){
      const s = { count:0, amount:0.0 }
      let allCheck = true
      this.items.forEach(item=>{
        if(item.checked){
          s.count++
          s.amount += item.amount*item.quantity
        }
        allCheck &= item.checked
      })
      s.allCheck = allCheck
      return s
    }
  },
  methods: {
	  ...mapActions(['addToast', 'setCart']),
    editItem(item){
      this.cartItem=item
    },
    allCheck(){
      const state = !this.summary.allCheck
      this.items.forEach(item=>{
        item.checked = state
      })
    },
    removeCart(){
      this.$confirm.open('确定要清空购物篮？').then(()=>{
        this.setCart([])
      })
    },
    postCart(){
      const postCarts = []
      this.items.forEach(item=>{
        if(item.checked === true)
          postCarts.push({ id:item.id, quantity:item.quantity })
      })
      this.xsd.api.post('client/cart/trans', postCarts).then(data=>{
        let carts = this.cart.concat()
        data.transes.forEach(trans=>{
          carts = carts.filter(i=>i.id!=trans.item)
        })
        console.log(carts)
        this.setCart(carts)
      })
    }
  },
  watch:{
    cart(val){
      this.items = val.map(item=>{
        const ni = this.items.find(i=>i.id==item.id)
        ni.quantity = item.quantity
        return ni
      })
    }

  },
  components: {
    CPane,
  	CIcon,
    CXsdItem,
    CPrice,
    CXsdBackground,
    CXsdNavButton,
    CSubmit,
    MOrder
  }

}
</script>