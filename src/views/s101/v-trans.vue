<template>
  <div class='page-wrapper bg-gray-light'>
    <div v-if="trans" class="bg-white">
      <c-xsd-header>
        <a class="i-btn ml20" :class="button.color" v-for="button in headerButtons" @click="button.click">
          <c-icon :name="button.icon"></c-icon>
          <h4 class="title">{{button.label}}</h4>
        </a>
      </c-xsd-header>
      <div class="p20">
        <c-xsd-item :item='trans.item'>
          <h5 slot="detail" class="c-text-light">{{trans.ctime|timeago}}</h5>
          <div slot="right" class="pl10">
            <c-icon name="material-chevron_right"></c-icon>
          </div>
        </c-xsd-item>
        <div class="divider dashed"></div>
        <c-label-text label="服务单号：">
          <h4 class="font-montserrat">{{trans.id}}</h4>
        </c-label-text>
        <c-label-text label="下单时间：">
          <h4 class="font-montserrat">{{trans.ctime}}</h4>
        </c-label-text>
        <c-label-text label="交易金额：">
          <h4>
          <span class="font-montserrat">{{parseFloat(trans.price)+parseFloat(trans.fee)|currency ''}} x {{trans.quantity}} = </span><c-price :amount="trans.cost" class="ib"></c-price>
          </h4>
        </c-label-text>
      </div>
      <c-action v-for="action in trans.actions" :action="action"></c-action>

      <c-xsd-nav-button>
        <a class="icon" @click="postMessage">
            <c-icon name="material-textsms" class="block"></c-icon>
        </a>
        <a class="icon" @click="reload">
            <c-icon name="material-refresh" class="block"></c-icon>
        </a>
      </c-xsd-nav-button>

      <m-order v-if="orderModal" :show.sync="orderModal" :item="trans.item" :agent="agent" @mutate="reload"></m-order>
    </div>
  </div>
</template>

<script>
import { CPane, CLabelText, CPrice, CButton, CBtnCircle, CIcon, CXsdItem, CXsdHeader, CXsdNavButton } from 'components'
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
      this.xsd.api.get('trans/'+this.$route.params.id).then(data=>{
        transition.next({
          trans:data.trans
        })
      })
    }
  },
  computed:{
    ...mapGetters(['user']),
    headerButtons(){
      const buttons = []
      if(this.user.role==10 && this.trans.stage==0){
        buttons.push({ label:'修改',icon:'material-edit', color:'c-blue', click:this.modifyTrans })
        buttons.push({ label:'取消',icon:'material-delete_forever',color:'c-red', click:this.removeTrans })
      }
      return buttons
    },
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
    postMessage(){
      this.$text.open({
        title: '说点什么',
        callback: message=>{
          this.xsd.api.post('trans/'+this.trans.id+'/message', { message }).then(data=>{
            this.trans.actions.push(data.action)
            this.$text.close(true)
          })
        }
      });
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
    CButton,
    CLabelText,
    CPrice,
    CBtnCircle,
    CIcon,
    CXsdItem,
    CXsdHeader,
    CXsdNavButton,
    CAction
  }
}
</script>
