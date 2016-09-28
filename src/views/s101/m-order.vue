<template>
  <c-modal :show.sync='show' :actions="null">
    <div class="flex-row mb10">
      <div class="flex-auto text-left p10">
        <h2>订单</h2>
      </div>
      <a @click="show=false" class="c-text-light"><c-icon name="material-clear" class="block"></c-icon></a>
    </div>


    <div class="flex-row border-top">
      <c-label class="p10">产品数量</c-label>
      <div class="flex-auto">
        <button class="float-right" @click="order.quantity=order.quantity+1"><c-icon name="material-add" class="block"></c-icon></button>
        <input class="float-right input-simple text-center font-montserrat" style="width:80px;line-height: 50px;font-size:16px" v-model="order.quantity" />
        <button :disabled="order.quantity<=1" class="float-right" @click="order.quantity=order.quantity-1"><c-icon name="material-remove" class="block"></c-icon></button>
      </div>
    </div>
    <div class="flex-row border-top p10">
      <c-label>订单金额</c-label>
      <div class="flex-auto text-right ">
        <span class="font-montserrat">{{order.price | currency ''}} x {{order.quantity}} =</span> <c-price :amount="agentAmount.cost" class="ib"></c-price>
      </div>
    </div>

    <div class="flex-row border-top p10" v-if="agent.strategy == 1">
      <c-label>代理费用</c-label>
      <div class="flex-auto text-right">
        <span class="font-montserrat" v-if="agentAmount.min == false && agentAmount.max == false">{{agent.fee | currency ''}} x {{order.quantity}} =</span> 
        <span v-if="agentAmount.min == true" class="c-text-light">最低代理费</span> 
        <span v-if="agentAmount.max == true" class="c-text-light">最高代理费</span> 
        <c-price :amount="agentAmount.fee" class="ib"></c-price>
      </div>
    </div>
    <div class="flex-row border-top p10" v-if="agent.strategy == 2">
      <c-label>代理费用</c-label>
      <div class="flex-auto text-right">
        <c-price :amount="agentAmount.fee" class="ib"></c-price>
      </div>
    </div>
    <div class="flex-row border-top p10" v-if="agent.strategy == 3">
      <c-label>代理费用</c-label>
      <div class="flex-auto text-right">
        <span class="font-montserrat" v-if="agentAmount.min == false && agentAmount.max == false">{{agentAmount.cost | currency ''}} x {{agent.fee}}% =</span> 
        <span v-if="agentAmount.min == true" class="c-text-light">最低代理费</span> 
        <span v-if="agentAmount.max == true" class="c-text-light">最高代理费</span> 
        <c-price :amount="agentAmount.fee" class="ib"></c-price>
      </div>
    </div>

    <div class="flex-row border-top p10">
      <c-label>合计金额</c-label>
      <div class="flex-auto text-right">
        <c-price :amount="agentAmount.amount" class="big c-red-dark ib"></c-price>
      </div>
    </div>
    <c-pane>
      <c-submit class="primary" :submit="postOrder" :disabled="false" label="确定"></c-submit>
    </c-pane>

  </c-modal>
</template>


<script>
import { CPane, CCell, CLabel, CButton, CSubmit, CFlex, CModal, CPrice, CIcon, CXsdImage } from 'components'

import { mapActions, mapGetters } from 'vuex'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    item:{
      type: Object
    },
    agent:{
      type: Object,
      default: null
    }
  },
  data(){
    return {
      order:{
        id:0,
        quantity:1,
        price:this.item.params.price,
      }
    }
  },
  ready(){
    this.xsd.api.getCache('client/trans').then(data=>{
      const trans = data.transes.find(t=>{
        return t.item.id == this.item.id && t.stat == 0
      })

      if(!!trans) {
        this.order.id = trans.id
        this.order.quantity = trans.sadd.quantity
      }

    })
  },
  computed:{
    ...mapGetters(['user']),
    agentAmount(){
      return this.xsd.trans.agentAmount(this.order.price, this.order.quantity, this.agent)
    },
  },
  methods: {
    ...mapActions(['addToast']),
    postOrder(){
      const post = {
        agent:this.agent.id,
        quantity:this.order.quantity,
        price:this.order.price,
        amount:this.agentAmount.amount
      }

      if(this.order.id == 0){
        this.xsd.api.post(this.xsd.service.get(this.item.service).surl('trans'), post).then(data=>{
          this.addToast('您已下单，请到结算台统一付款。')
          this.xsd.api.dirty('client/trans')
        }).finally(()=>{
          this.show=false
        })
      }else{
        this.xsd.api.post(this.xsd.service.get(this.item.service).surl('trans/'+this.order.id), post).then(data=>{
          this.addToast('修改完成！')
          this.xsd.api.dirty('client/trans')
          this.$emit('mutate', this.order.id)
        }).finally(()=>{
          this.show=false
        })
      }
    }

  },
  components: {
    CPane,
    CCell,
    CLabel,
    CButton,
    CSubmit,
    CFlex,
    CModal,
    CPrice,
    CIcon,
    CXsdImage,
  }
}
</script>
