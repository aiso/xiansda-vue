<template>
  <div class="table-row">
    <div>
      <c-icon :name="service.config.icon" class="block"></c-icon>  
    </div>
    <div class="extend plr10">
      <c-price :amount="item.params.price" class="big c-red"></c-price>
      <h5 class="c-text-light" v-if="!agent">{{service.config.title}}</h5>
      <h5 class="c-text-light" v-if="!!agent && agent.strategy==1">代理费：<c-price :amount="agent.fee" class="ib" pref=""></c-price> 元 / 单位</h5>
      <h5 class="c-text-light" v-if="!!agent && agent.strategy==2">代理费：<c-price :amount="agent.fee" class="ib" pref=""></c-price> 元 / 笔</h5>
      <h5 class="c-text-light" v-if="!!agent && agent.strategy==3">代理费：总价<span class="font-montserrat text-bold"> {{agent.fee| currency ''}}%</span></h5>
    </div>
    <div>
      <c-button v-if="action=='addAgent'" class="ib plr10 primary text-ls" @click="addAgent">添加代理</c-button>
      <c-button v-if="action=='modifyAgent'" class="ib plr10 text-ls" @click="modifyAgent">修改代理</c-button>
      <c-button v-if="action=='order'" class="ib plr10 primary text-ls" @click="order">下单</c-button>
    </div>

    <m-agent v-if="agentModal" :show.sync="agentModal" :item="item" :agent="agent" @mutate='onUpdateAgent'></m-agent>
  </div>
</template>

<script>
import { CButton, CIcon, CPrice } from 'components'
import MAgent from './m-agent'
import { mapActions } from 'vuex'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    item: {
      type: Object
    },
    user: {
      type: Object,
      default:null
    }
  },
  data(){
  	return{
  		service:this.xsd.service.get(this.item.service),
      action:null,
      station:null,
      agent:null,
      agentModal:false
  	}
  },
  ready(){
    if(!this.user) return

    if(this.user.role == 30){
      this.xsd.api.getCache(this.agentUrl).then(data=>{
        if(data.agent){
          this.agent = data.agent
          this.action = 'modifyAgent'
        }
        else{
          this.action = 'addAgent'
        }
      })
    }else if(this.user.role == 10){
      this.xsd.api.getCache(this.agentUrl).then(data=>{
        if(data.agent){
          this.agent = data.agent
          this.action = 'order'
        }
      })
    }
  },
  computed: {
    agentUrl(){
      if(this.user.role == 30)
        return this.service.surl('item/'+this.item.id+'/agent/'+this.user.id)
      else if(this.user.role == 10)
        return this.service.surl('item/'+this.item.id+'/agent/'+this.user.station)
    }
  },
  methods: {
    ...mapActions(['addItem', 'updateItem']),
    addAgent(){
      this.agentModal = true
    },
    modifyAgent(){
      this.agentModal = true
    },
    order(){

    },
    onUpdateAgent(data){
      if(!this.agent)
        this.addItem(data.item)
      else
        this.updateItem(data.item)

      this.xsd.api.dirty(this.agentUrl)
      this.agent = data.agent
      this.action = 'modifyAgent'
    }
  },
  components:{
    MAgent,
    CButton,
  	CIcon,
  	CPrice
  }
}
</script>

