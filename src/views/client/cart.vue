<template>
  <div class="page-wrapper bg-gray-light">
    <c-xsd-background v-if="items.length==0" :statement="loading" title="饥肠辘辘啊" icon="fa-shopping-basket"></c-xsd-background>

    <h2 class="p20 text-ls">购物车</h2>
    <c-xsd-item v-for="item in items" :item="item" class="bg-white list-item border-bottom">
      <div slot="subTitle">
        <span>{{item.quantity}} x {{item.price|currency ''}} = </span><c-price :amount="item.price*item.quantity" class="ib"></c-price>
      </div>
      <div slot="right">
        <a @click="item.checked=!item.checked"><c-icon :name="item.checked?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>
    </c-xsd-item>

    <div class="flex-row">
      <div class="flex-auto"></div>
      <span class="c-text-light">全选</span>
      <a @click="allCheck"><c-icon :name="summary.allCheck?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
    </div>

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


  </div>
</template>

<script>
import { CPane, CIcon, CXsdItem, CPrice, CXsdBackground, CXsdNavButton, CButton } from 'components'
import { mapActions, mapGetters } from 'vuex'


export default {
  data(){
  	return{
      loading:{
        icon:'material-hourglass_empty',
        title: '努力加载中...'
      },
  		items:[],
      showCart:false,
      cartItem:null
  	}
  },
  attached(){
    if(this.cart.length == 0){
      this.loading = null
    }else{
      this.xsd.api.post('client/cart', this.cart).then(data=>{
        this.items = data.items
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
          s.amount += item.price*item.quantity
        }
        allCheck &= item.checked
      })
      s.allCheck = allCheck
      return s
    }
  },
  /*
  route: {
    data(transition){
      this.xsd.item.get(this.cart.map(item=>item.id)).then(_items=>{
        const items = _items.map(item=>{
          return Object.assign({ checked:false, click:()=>{ this.editItem(item) } }, this.cart.find(i=>i.id==item.id), item)
        })
        transition.next({ items })
      })
    }
  },*/
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
    CPane,
  	CIcon,
    CXsdItem,
    CPrice,
    CXsdBackground,
    CXsdNavButton,
    CButton,
  }

}
</script>