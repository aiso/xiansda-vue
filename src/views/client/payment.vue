<template>
  <div class='page-wrapper bg-gray-light'>
    <c-xsd-background v-if="bills.length==0" title="您当前没有未付账单"></c-xsd-background>

    <div class="table-row border-bottom" style="padding:10px 0 10px 20px">
      <div class="nowrap">
      <h3 class="text-ls">我的账单</h3>
      </div>
      <div class="extend">
        <a><c-icon name="material-refresh" class="block"></c-icon></a>
      </div>
      <div class="nowrap">
        <span class="c-text-light">全选</span>
      </div>
      <div>
        <a @click="allCheck"><c-icon :name="summary.allCheck?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>
    </div>
    <c-xsd-item v-for="bill in bills" :item="bill.trans.item" @xsd-item-click='xsdItemClick' class="bg-white list-item border-bottom">
      <div slot="subTitle">
        <c-price :amount="bill.content" class="ib c-text"></c-price>
        <span class="float-right font-10">{{bill.ctime | timeago}}</span>
      </div>
      <div slot="right">
        <a @click="bill.checked=!bill.checked"><c-icon :name="bill.checked?'material-check_box':'material-check_box_outline_blank'" class="block c-text-light"></c-icon></a>
      </div>
    </c-xsd-item>

    <c-xsd-nav-button style="width:15rem" v-if="bills.length>0">
      <div class="p10 float-right">
        <c-submit class="primary small" :disabled="summary.count==0" label="提交" :submit="submit"></c-submit>
      </div>
      <div class="float-right text">
        <c-price :amount="summary.amount" class="c-red-dark"></c-price>  
      </div>
      <div class="float-right text c-text-light">
        合计：
      </div>
    </c-xsd-nav-button>
  </div>
</template>

<script>
import { CXsdBackground, CXsdNavButton, CXsdItem, CIcon, CPrice, CSubmit } from 'components'


export default {
  data(){
    return{
      bills:[],
    }
  },
  route: {
    data(transition){
      this.xsd.api.get('client/bills').then(data=>{
        const bills = this.initBills(data.bills)
        transition.next({
          bills
        })
      })
    }
  },
  computed: {
    summary(){
      const s = { count:0, amount:0.0 }
      let allCheck = true
      this.bills.forEach(bill=>{
        if(bill.checked){
          s.count++
          s.amount += bill.content*1.00
        }
        allCheck &= bill.checked
      })
      s.allCheck = allCheck
      return s
    }
  },
  methods:{
    allCheck(){
      const state = !this.summary.allCheck
      this.bills.forEach(bill=>{
        bill.checked = state
      })
    },
    initBills(bills){
      return bills.map(bill=>{
        bill.checked = false
        bill.trans.item.bid = bill.trans.id
        return bill
      })
    },
    xsdItemClick(item){
      const bill = this.bills.find(b=>b.trans.id == item.bid)
      if(!!bill){
        const service = this.xsd.service.get(bill.trans.item.service)
        this.$route.router.go(service.router('trans' , { id:bill.trans.id }))
      }
    },
    submit(){
      var billIds = [];
      this.bills.forEach(bill=>{
        if(bill.checked)
          billIds.push(bill.id)
      })

      this.xsd.api.post('client/checkout', { ids:billIds, amount:this.summary.amount }).then(data=>{
        this.xsd.nav.payment(data.payment.id)
      })
    },
    reload(){
      this.xsd.api.get('client/bills').then(data=>{
        this.bills = this.initBills(data.bills)
      })
    }
  },
  components: {
    CXsdBackground,
    CXsdNavButton,
    CXsdItem,
    CIcon,
    CPrice,
    CSubmit
  }   
}
</script>