<template>
  <div class="table-row">
    <div>
      <c-icon :name="service.config.icon" class="block"></c-icon>  
    </div>
    <div class="extend plr10">
      <c-price :amount="item.params.price" class="big"></c-price>
      <h5 class="c-text-light">{{service.config.title}}</h5>
    </div>
    <div>
      <c-button v-if="action=='addAgent'" class="ib plr10 primary" @click="addAgent">添加代理</c-button>
      <c-button v-if="action=='modifyAgent'" class="ib plr10 warning" @click="modifyAgent">修改代理</c-button>
      <c-button v-if="action=='order'" class="ib plr10 primary" @click="order">下单</c-button>
    </div>

    <m-agent :show.sync="agentModal"></m-agent>
  </div>
</template>

<script>
import { CButton, CIcon, CPrice } from 'components'
import MAgent from './m-agent'

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
      this.xsd.api.getCache(this.service.surl('item/'+this.item.id+'/agent/'+this.user.id)).then(data=>{
        if(data.agent){
          this.agent = data.agent
          this.action = 'modifyAgent'
        }
        else{
          this.action = 'addAgent'
        }
      })
    }else if(this.user.role == 10){
      this.xsd.api.getCache(this.service.surl('item/'+this.item.id+'/agent/'+this.user.station)).then(data=>{
        if(data.agent){
          this.agent = data.agent
          this.action = 'order'
        }
      })
    }



  },
  methods: {
    addAgent(){
      this.agentModal = true

    },
    modifyAgent(){

    },
    order(){

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

