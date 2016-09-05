<template>
  <div class="page-wrapper bg-gray-light">
  	<c-layout-center v-if="items.length==0">
	    <c-icon name="fa-shopping-basket" class="icon"></c-icon>
	    <h3 class="mb20 c-text-light">饥肠辘辘啊</h3>
  	</c-layout-center>
    
    <div class="table-row" style="padding:10px 0 10px 20px">
      <div class="extend">
        <h2>我的购物车</h2>
      </div>
      <div class="nowrap">
        <span class="c-text-light">全选</span>
      </div>
      <div>
        <a @click="allCheck"><c-icon :name="summary.allCheck?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>
    </div>
    <c-xsd-item v-for="item in items" :item="item" class="bg-white list-item border-bottom">
      <div slot="subTitle">
        <span>{{item.quantity}} x {{item.price|currency ''}} = </span><c-price :amount="item.price*item.quantity" class="ib"></c-price>
      </div>
      <div slot="right">
        <a @click="item.checked=!item.checked"><c-icon :name="item.checked?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>
    </c-xsd-item>

    <c-xsd-nav-button style="width:15rem">
      <div class="p10 float-right">
        <c-button class="primary small" :disabled="summary.count==0" style="width:auto">结算</c-button>  
      </div>
      <div class="float-right text">
        <c-price :amount="summary.amount"></c-price>  
      </div>
      <div class="float-right text c-text-light">
        合计：
      </div>
    </c-xsd-nav-button>

    <m-cart :show.sync="showCart" :item="cartItem"></m-cart>
  </div>
</template>

<script>
import { CLayoutCenter, CPane, CIcon, CXsdItem, CPrice, CXsdNavButton, CButton } from 'components'
import { mapActions, mapGetters } from 'vuex'
import MCart from './m-cart'

export default {
  data(){
  	return{
  		items:[],
      showCart:false,
      cartItem:null
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
          s.amount += item.price*item.quantity
        }
        allCheck &= item.checked
      })
      s.allCheck = allCheck
      return s
    }
  },
  route: {
    data(transition){
      this.xsd.item.get(this.cart.map(item=>item.id)).then(_items=>{
        const items = _items.map(item=>{
          return Object.assign({ checked:false, click:()=>{ this.editItem(item) } }, this.cart.find(i=>i.id==item.id), item)
        })
        transition.next({ items })
      })
    }
  },
  methods: {
	  ...mapActions(['addToast']),
    editItem(item){
      this.cartItem=item
      this.showCart = true
    },
    allCheck(){
      const state = !this.summary.allCheck
      this.items.forEach(item=>{
        item.checked = state
      })
    }
  },
  watch:{
    cart(val){
      this.items = this.items.map(item=>{
        item.quantity = val.find(i=>i.id==item.id)['quantity']
        return item
      })
    }

  },
  components: {
    MCart,
  	CLayoutCenter,
    CPane,
  	CIcon,
    CXsdItem,
    CPrice,
    CXsdNavButton,
    CButton,
  }

}
</script>