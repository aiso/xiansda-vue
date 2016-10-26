<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <div v-if="items.length>0">
      <c-list-header :action-id="actionId">
        <a class="i-text-right">服务单({{workTranses.length}})<c-icon name="material-chevron_right"></c-icon></a>
      </c-list-header>
      <div v-for='item in items' class="flex-row list-item border-top">
        <c-xsd-image :src="item.img" width=50 height=50></c-xsd-image>
        <div class=" plr10 span7">
          <h4 class="single-line">{{item.title}}</h4>
          <h5 class="mt5 c-text-light"><c-xsd-profile-name :uid="item.user"></c-xsd-profile-name></h5>
        </div>
        <div class="flex-auto"></div>
        <div class="text-center">
          <c-price :amount="item.price*item.quantity" class="c-text mb5"></c-price>  
          <h5><span class="c-text-light">数量：</span><span class="font-montserrat text-h4">{{item.quantity}}</span></h5>
        </div>
        <div>
          <c-checker :checked.sync="item.checked"></c-checker>
        </div>
      </div>
      <div class="flex-row pl20 border-top">
        <span class="c-text-light">利润：</span>
        <c-price :amount="summary.cost-summary.amount" class="c-text"></c-price>  
        <div class="flex-auto"></div>
        <span class="c-text-light">全选</span>
        <c-checker :checked.sync="itemAllChecked" :click="allCheck"></c-checker>
      </div>

      <c-xsd-nav-button style="width:15rem">
        <div class="p10 float-right">
          <c-submit class="primary small" :submit="postWorks" :disabled="summary.count==0" label='完成'></c-submit>  
        </div>
        <div class="float-right text">
          <c-price :amount="summary.amount" class="c-red"></c-price>  
        </div>
        <div class="float-right text">
          <span class="font-montserrat plr5">{{summary.count}},</span>
        </div>
        <div class="float-right text c-text-light">
          合计：
        </div>
      </c-xsd-nav-button>

    </div>
  </div>
</template>


<script>
import { CPane, CIcon, CCell, CPrice, CXsdImage, CListItem, CXsdProfileName, CXsdBackground, CChecker, CXsdNavButton, CSubmit } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CActionStatus from '../action/c-status'
import CListHeader from './c-list-header'

export default {
  data(){
    return {
      actionId:10020,
      workTranses:[],
      items:[],
      itemAllChecked:false
    }
  },
  route: {
    data(transition){
      transition.next(this.initData())
    }
  },
  computed: {
    ...mapGetters(['transes', 'user']),
    summary(){
      const s = { count:0,amount:0.0,cost:0.0  }
      let allCheck = true
      this.items.forEach(item=>{
        if(item.checked){
          s.count++
          s.cost += item.cost
          s.amount += item.price*item.quantity
        }
        allCheck &= item.checked
      })
      this.itemAllChecked = !!allCheck
      return s
    }
  },
  methods: {
    initData(){
      const workTranses = this.transes.filter(trans=>(trans.current.stat==0 && trans.current.action==this.actionId && trans.current.user==this.user.id))

      const items = []
      workTranses.forEach(trans=>{
        let item = items.find(i=>i.id==trans.item.id)
        if(!!item){
          item.quantity += trans.quantity
          item.cost += parseFloat(trans.cost)
          item.works.push(trans.current.id)
        }
        else{
          item = Object.assign({ 
            quantity:trans.quantity,
            cost:parseFloat(trans.cost),
            checked:false,
            works:[trans.current.id] }, 
            trans.item)

          items.push(item)
        }
      })

      return { workTranses, items }
    },
    allCheck(){
      const state = !this.itemAllChecked
      this.items.forEach(item=>{
        item.checked = state
      })
    },
    postWorks(){
      let works = []
      this.items.forEach(item=>{
        if(item.checked === true){
          works = works.concat(item.works)
        }
      })

      this.xsd.api.post('action/'+this.actionId+'/done', { works }).then(data=>{
        this.xsd.sync.load('transes').then(data=>{
          const d = this.initData()
          this.workTranses = d.workTranses
          this.items = d.items
        })
      })
      

    }
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CPrice,
    CXsdImage,
    CListItem,
    CActionStatus,
    CXsdProfileName,
    CXsdBackground,
    CChecker,
    CXsdNavButton,
    CSubmit,
    CListHeader
  } 
}
</script>