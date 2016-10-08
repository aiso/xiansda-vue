<template>
  <div>
    <div class="flex-row action" v-if="statement=='client-pay'">
      <h4 class="pr10 flex-auto"><span class="c-text-light">金额：</span><c-price :amount="action.content" class="c-red-dark ib"></c-price></h4>
      <a v-link="{ name:'client/payment' }">点击付款</a>
      <c-icon name="material-chevron_right" class="c-text-light"></c-icon>
    </div>
    <div class="flex-row action" v-if="statement=='client-payed'">
      <h4 class="pr10 flex-auto"><span class="c-text-light">金额：</span><c-price :amount="action.content" class="c-red-dark ib"></c-price></h4>
      <a>已付款</a>
      <c-icon name="material-done" class="c-text-light"></c-icon>
    </div>
    <div class="flex-row action" v-if="statement=='unpay'">
      <h4 class="pr10 flex-auto"><span class="c-text-light">金额：</span><c-price :amount="action.content" class="c-red-dark ib"></c-price></h4>
      <h4 class="text-ls c-text">等待付款...</h4>
    </div>
    <div class="flex-row action" v-if="statement=='payed'">
      <h4 class="pr10 flex-auto"><span class="c-text-light">金额：</span><c-price :amount="action.content" class="c-red-dark ib"></c-price></h4>
      <h4 class="text-ls c-text">已付款</h4>
    </div>
  </div>
</template>

<script>
import actionMixin from './action-mixin'
import { CIcon, CPrice, CButton } from 'components'
import { mapGetters } from 'vuex'

export default {
  mixins: [actionMixin],
  computed: {
    statement(){
      if(this.user.role == this.xsd.static.role.client){
        return (this.action.stat == 0)?'client-pay':'client-payed'
      }else if(this.user.role == this.xsd.static.role.station){
        return (this.action.stat == 0)?'unpay':'payed'
      }
    }
  },
  methods: {
    onAction(){
      if(this.action.stat == 0 && this.user.role == this.xsd.static.role.client)
        this.$route.router.go({ name:'client/payment' })
    }
  },
  components:{
    CIcon,
    CPrice,
    CButton
  }
}

</script>