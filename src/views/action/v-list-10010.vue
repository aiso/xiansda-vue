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

    </c-pane>
  </div>
</template>

<script>
import { CPane, CCell, CIcon, CPrice, CXsdItem, CXsdBackground } from 'components'
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
      action:this.xsd.action.get(this.actionId),
    }
  },
  route: {
    data(transition){
      this.xsd.api.get('user/works/'+this.actionId+'?with=trans').then(data=>{
        console.log(data)
        const items = data.works.map(work=>{
          return {
            trans:work.trans.id,
            title:work.trans.item.title,
            img:work.trans.item.img,
            amount:work.content,
            checked:false
          }
        })
        console.log(items)
        transition.next({ items })
      })
    }
  },
  computed: {
    ...mapGetters(['works']),
  },
  methods: {
    showTrans(){

    }
  },
  components:{
    CPane,
    CCell,
    CIcon,
    CPrice,
    CXsdItem,
    CXsdBackground
  }
}

</script>