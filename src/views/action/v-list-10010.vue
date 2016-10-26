<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有待处理事务"></c-xsd-background>
    <div v-if="items.length>0">
      <c-list-header :action-id="actionId"></c-list-header>
      <c-xsd-item v-for='item in items' :item="item" class="bg-white list-item border-top" @xsd-item-click="showTrans">
        <div slot="detail">
          <c-price :amount="item.amount" class="ib c-red"></c-price>
        </div>
        <div slot="right">
          <c-checker :checked.sync="item.checked"></c-checker>
        </div>
      </c-xsd-item>
      <div class="flex-row pl20 border-top">
        <div class="flex-auto"></div>
        <span class="c-text-light">全选</span>
        <c-checker :checked.sync="itemAllChecked" :click="allCheck"></c-checker>
      </div>

      <c-xsd-nav-button style="width:15rem">
        <div class="p10 float-right">
          <c-submit class="primary small" :submit="postPayment" :disabled="summary.count==0" label='支付'></c-submit>  
        </div>
        <div class="float-right text">
          <c-price :amount="summary.amount" class="c-red big"></c-price>  
        </div>
        <div class="float-right text c-text-light">
          合计：
        </div>
      </c-xsd-nav-button>
    </div>

  </div>
</template>

<script>
import { CPane, CCell, CIcon, CPrice, CSubmit, CXsdItem, CChecker, CXsdBackground, CXsdNavButton } from 'components'
import { mapGetters } from 'vuex'
import CListHeader from './c-list-header'

export default {
  data(){
    return{
      actionId:10010,
      items:[],
      itemAllChecked:false
    }
  },
  route: {
    data(transition){
      this.xsd.api.get('user/works/'+this.actionId+'?with=trans').then(data=>{
        const items = data.works.map(work=>{
          return {
            id:work.id,
            trans:work.trans.id,
            title:work.trans.item.title,
            img:work.trans.item.img,
            amount:parseFloat(work.content),
            checked:false
          }
        })
        transition.next({ items })
      })
    }
  },
  computed: {
    ...mapGetters(['works']),
    summary(){
      const s = { count:0, amount:0.0 }
      let allCheck = true
      this.items.forEach(item=>{
        if(item.checked){
          s.count++
          s.amount += item.amount
        }
        allCheck &= item.checked
      })
      //s.allCheck = allCheck
      this.itemAllChecked = !!allCheck
      return s
    }
  },
  methods: {
    allCheck(){
      const state = !this.itemAllChecked
      this.items.forEach(item=>{
        item.checked = state
      })
    },
    showTrans(){

    },
    postPayment(){
      const ids = this.items.filter(item=>item.checked===true).map(item=>item.id)
      this.xsd.api.post('action/'+this.actionId+'/pay', { works:ids }).then(data=>{
        this.xsd.nav.payment(data.payment.id)
      })
    }
  },
  components:{
    CPane,
    CCell,
    CIcon,
    CPrice,
    CSubmit,
    CXsdItem,
    CChecker,
    CXsdBackground,
    CXsdNavButton,
    CListHeader
  }
}

</script>