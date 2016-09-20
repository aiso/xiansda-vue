<template>
  <c-modal :show.sync='show' :actions="null">
    <div class="flex-row">
      <div class="flex-auto text-left p10">
        <h2>下单</h2>
      </div>
      <a @click="show=false" class="c-text-light"><c-icon name="material-clear" class="block"></c-icon></a>
    </div>


    <div class="flex-row border-top p10">
      <c-label class="p10">产品数量</c-label>
      <div class="flex-auto">
        <button class="float-right" @click="order.quantity=order.quantity+1"><c-icon name="material-add" class="block"></c-icon></button>
        <input class="float-right input-simple text-center font-montserrat" style="width:80px;line-height: 50px;font-size:16px" v-model="order.quantity" />
        <button :disabled="order.quantity<=1" class="float-right" @click="order.quantity=order.quantity-1"><c-icon name="material-remove" class="block"></c-icon></button>
      </div>
    </div>
    <div class="flex-row border-top p10">
      <c-label class="p10">订单金额</c-label>
      <div class="flex-auto text-right p10">
        <span class="font-montserrat">{{order.price | currency ''}} x {{order.quantity}} =</span> <c-price :amount="itemAmount" class="ib"></c-price>
      </div>
    </div>

    <div class="flex-row border-top p10" v-if="agent.strategy == 1">
      <c-label class="p10">代理费用</c-label>
      <div class="flex-auto text-right p10">
        <span class="font-montserrat">{{agent.fee | currency ''}} x {{order.quantity}} =</span> <c-price :amount="feeAmount" class="ib"></c-price>
      </div>
    </div>
    <div class="flex-row border-top p10" v-if="agent.strategy == 2">
      <c-label class="p10">代理费用</c-label>
      <div class="flex-auto text-right p10">
        <c-price :amount="feeAmount" class="ib"></c-price>
      </div>
    </div>
    <div class="flex-row border-top p10" v-if="agent.strategy == 3">
      <c-label class="p10">代理费用</c-label>
      <div class="flex-auto text-right p10">
        <span class="font-montserrat">{{itemAmount | currency ''}} x {{agent.fee}}% =</span> <c-price :amount="feeAmount" class="ib"></c-price>
      </div>
    </div>

    <div class="flex-row border-top p10">
      <c-label class="p10">合计金额</c-label>
      <div class="flex-auto text-right pr10">
        <c-price :amount="totalAmount" class="big c-red-dark ib"></c-price>
      </div>
    </div>
    <c-pane>
      <c-submit class="primary" :submit="postAgent" :disabled="false" label="确定"></c-submit>
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
        quantity:1,
        price:this.item.params.price,
      }
    }
  },
  computed:{
    ...mapGetters(['user']),
    itemAmount(){
      return this.order.quantity * this.order.price
    },
    feeAmount(){
      if(this.agent.strategy == 1)
        return this.agent.fee *  this.order.quantity
      else if(this.agent.strategy == 2)
        return this.agent.fee
      else if(this.agent.strategy == 3)
        return (this.itemAmount * this.agent.fee)/100
      return 0
    },
    totalAmount(){
      return this.itemAmount + this.feeAmount
    }
   },
  methods: {

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
