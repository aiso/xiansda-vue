<template>
  <div class='page-wrapper'>
    <div v-if="trans">
      <div class="table-row border-bottom" style="padding:10px 0 10px 10px">
        <div class="valign-top">
          <c-xsd-image :src="trans.item.img" width=48 height=48></c-xsd-image>
        </div>
        <div class="extend plr10">
          <a>{{trans.item.title}}</a>
        </div>
        <div>
          <c-icon name="material-chevron_right" class="block c-text-light"></c-icon>
        </div>
      </div>
      <div class="p20 border-bottom table-row">
        <div class="extend">
          <h4 class="text-lh2"><span class="c-text-light">服务单号：</span><span class="font-montserrat">{{trans.id}}</span></h4>
          <h4 class="text-lh2"><span class="c-text-light">下单时间：</span><span class="font-montserrat">{{trans.ctime}}</span></h4>
          <h4 class="text-lh2">
            <span class="c-text-light">产品价格：</span>
            <span class="font-montserrat">{{trans.sadd.price|currency ''}} x {{trans.sadd.quantity}} = {{trans.sadd.cost|currency ''}}</span>
          </h4>
          <h4 class="text-lh2">
            <span class="c-text-light">代理费用：</span>
            <span class="font-montserrat">{{trans.sadd.agent_fee|currency ''}} </span>
          </h4>
          <h4 class="text-lh2">
            <span class="c-text-light">合计金额：</span>
            <span class="font-montserrat">{{trans.sadd.amount|currency ''}} </span>
          </h4>
        </div>
        <div class="nowrap valign-top" v-if="user.role==10">
          <c-btn-circle icon="material-edit" title="修改订单" color="blue" class="mb10" :click="modifyTrans"></c-btn-circle>
          <c-btn-circle icon="material-delete_forever" title="取消订单" color="red-dark" :click="removeTrans"></c-btn-circle>
        </div>
      </div>
      <c-action v-for="action in trans.actions" :action="action" class="action"></c-action>

      <c-xsd-nav-button>
        <a class="icon" @click="reload">
            <c-icon name="material-refresh" class="block"></c-icon>
        </a>
      </c-xsd-nav-button>

      <m-order v-if="orderModal" :show.sync="orderModal" :item="trans.item" :agent="agent" @mutate="reload"></m-order>
    </div>
  </div>
</template>

<script>
import { CPane, CBtnCircle, CIcon, CXsdImage, CXsdNavButton } from 'components'
import CAction from '../action/c-action'
import MOrder from './m-order'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      trans:null,
      agent:null,
      orderModal:false,
      service:this.xsd.service.get(101)
    }
  },
  route: {
    data(transition){
      this.xsd.api.getCache(this.service.surl('trans/'+this.$route.params.id)).then(data=>{
        transition.next({
          trans:data.trans
        })
      })
    }
  },
  computed:{
    ...mapGetters(['user']),
    transUrl(){
      return this.service.surl('trans/'+this.trans.id)
    }
  },
  methods: {
    removeTrans(){
      this.$confirm.open('确定取消订单？').then(()=>{
        this.xsd.api.delete(this.transUrl).then(()=>{
          this.xsd.api.dirty('client/trans')
          history.back()
        })
      })
    },
    modifyTrans(){
      this.xsd.api.getCache(this.service.surl('item/'+this.trans.item.id+'/agent/'+this.trans.station)).then(data=>{
        this.agent = data.agent
        this.orderModal = true
      })
    },
    reload(){
      this.xsd.api.dirty(this.transUrl)
      this.xsd.api.getCache(this.transUrl).then(data=>{
        this.trans = data.trans
      })
    },
  },
  components: {
    MOrder,
    CPane,
    CBtnCircle,
    CIcon,
    CXsdImage,
    CXsdNavButton,
    CAction
  }
}
</script>
