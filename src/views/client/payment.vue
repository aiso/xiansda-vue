<template>
  <div class='page-wrapper bg-gray-light'>
    <c-xsd-background v-if="bills.length==0" title="您当前没有未付账单"></c-xsd-background>

    <div class="table-row" style="padding:10px 0 10px 20px">
      <div class="extend">
        <h3 class="text-ls">我的账单</h3>
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
  </div>
</template>

<script>
import { CXsdBackground, CXsdNavButton, CIcon, CPrice, CButton } from 'components'


export default {
  data(){
    return{
      bills:[],
      items:[],
    }
  },
  route: {
    data(transition){
      this.xsd.api.getCache('client/bills').then(data=>{
        transition.next({
          bills:data.bills
        })
      })
    }
  },
  computed: {
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
  methods:{
    reload(){
      this.xsd.api.dirty('client/bills')
      this.xsd.api.getCache('client/bills').then(data=>{
        this.bills = data.bills
      })
    }
  },
  components: {
    CXsdBackground,
    CXsdNavButton,
    CIcon,
    CPrice,
    CButton
  }   
}
</script>