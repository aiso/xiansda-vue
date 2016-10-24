<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有待处理事务"></c-xsd-background>
    <c-pane v-if="items.length>0">
      <div class="flex-row c-text-light border-bottom">
        <c-icon :name="action.icon" class="block"></c-icon>
        <h4 class="text-ls flex-auto">待付账单</h4>
      </div>

      <c-xsd-item v-for='item in items' :item="item" class="bg-white list-item border-bottom" @xsd-item-click="showTrans">
        <div slot="detail">
          <c-price :amount="item.amount" class="ib c-red"></c-price>
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
          <c-submit class="primary small" :submit="postPayment" :disabled="summary.count==0" label='支付'></c-submit>  
        </div>
        <div class="float-right text">
          <c-price :amount="summary.amount" class="c-red big"></c-price>  
        </div>
        <div class="float-right text c-text-light">
          合计：
        </div>
      </c-xsd-nav-button>
    </c-pane>

  </div>
</template>

<script>
import { CPane, CCell, CIcon, CPrice, CSubmit, CXsdItem, CXsdBackground, CXsdNavButton } from 'components'
import { mapGetters } from 'vuex'

export default {
  props: {
    actionId:{
      type: Number,
      default: 10010
    }
  },
  data(){
    return{
      items:[],
      action:this.xsd.static.action(this.actionId),
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
      s.allCheck = allCheck
      return s
    }
  },
  methods: {
    allCheck(){
      const state = !this.summary.allCheck
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
    CXsdBackground,
    CXsdNavButton
  }
}

</script>