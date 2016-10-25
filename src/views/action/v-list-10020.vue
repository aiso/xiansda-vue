<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="items.length>0">
      <div class="flex-row">
        <c-icon :name="config.icon" class="block c-text-light"></c-icon>
        <h4 class="text-ls flex-auto c-text-light">{{config.name}}</h4>
        <a class="i-text-right">服务单({{workTranses.length}})<c-icon name="material-chevron_right"></c-icon></a>
      </div>
      <div v-for='item in items' class="flex-row ptb10 border-top">
        <c-xsd-image :src="item.img" width=50 height=50></c-xsd-image>
        <div class=" plr10 span7">
          <h4 class="single-line">{{item.title}}</h4>
          <h5 class="mt5 c-text-light"><c-xsd-profile-name :uid="item.user"></c-xsd-profile-name></h5>
        </div>
        <div class="flex-auto"></div>
        <div class="text-center">
          <h2 class="font-montserrat">{{item.quantity}}</h2>
        </div>
        <div>
          <c-checker :checked.sync="item.checked"></c-checker>
        </div>
      </div>
      <div class="flex-row pl20 border-top">
        <div class="flex-auto"></div>
        <span class="c-text-light">全选</span>
        <c-checker :checked.sync="itemAllChecked" :click="allCheck"></c-checker>
      </div>

      <c-xsd-nav-button style="width:15rem">
        <div class="p10 float-right">
          <c-submit class="primary small" :submit="postWorks" :disabled="summary.count==0" label='完成'></c-submit>  
        </div>
        <div class="float-right text">
          <span class="font-montserrat font-20 plr5">{{summary.count}}</span>
        </div>
        <div class="float-right text c-text-light">
          合计：
        </div>
      </c-xsd-nav-button>

    </c-pane>
  </div>
</template>


<script>
import { CPane, CIcon, CCell, CXsdImage, CListItem, CXsdProfileName, CXsdBackground, CChecker, CXsdNavButton, CSubmit } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CActionStatus from '../action/c-status'

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
      const workTranses = this.transes.filter(trans=>(trans.current.stat==0 && trans.current.action==this.actionId && trans.current.user==this.user.id))

      const items = []
      workTranses.forEach(trans=>{
        let item = items.find(i=>i.id==trans.item.id)
        if(!!item){
          item.quantity += trans.quantity
          item.works.push(trans.current.id)
        }
        else{
          item = Object.assign({ quantity:trans.quantity,checked:false,works:[trans.current.id] }, trans.item)
          items.push(item)
        }
      })
      transition.next({
        workTranses,
        items
      })

    }
  },
  computed: {
    ...mapGetters(['transes', 'user']),
    config(){
      return this.xsd.action.config(this.actionId)
    },
    summary(){
      const s = { count:0 }
      let allCheck = true
      this.items.forEach(item=>{
        if(item.checked){
          s.count++
        }
        allCheck &= item.checked
      })
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
    postWorks(){
      const works = []
      this.items.forEach(item=>{
        if(item.checked === true){
          console.log(item.works)
          works.concat(...item.works)
        }
      })
      console.log(works)

    }
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CXsdImage,
    CListItem,
    CActionStatus,
    CXsdProfileName,
    CXsdBackground,
    CChecker,
    CXsdNavButton,
    CSubmit
  } 
}
</script>