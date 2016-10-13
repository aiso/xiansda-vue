<template>
  <c-modal :show.sync='show' :actions="null">
    <div class="flex-row">
      <h3 class="text-left p10 text-ls flex-auto">代理产品</h3>  
      <a @click="removeAgent" class="c-red" v-if="!!item.agent"><c-icon name="material-delete_forever" class="block"></c-icon></a>
    </div>
    <div class="divider"></div>
    <div class="flex-row">
      <c-xsd-image :src="item.img" width=50 height=50></c-xsd-image>
      <div class="flex-auto text-left plr10">
        <h4>{{item.title}}</h4>
      </div>
      <div>
        <h5 class="c-text-light mb5">产品价格</h5>
        <c-price :amount="item.price" class="c-red"></c-price>
      </div>
      
    </div>
    <div class="divider"></div>
    <div class="flex-row mb20 pl10">
      <h4 class="c-text-light">代理费用</h4>
      <div class="flex-auto">
        <input class="input-simple text-center font-montserrat full-width" v-model="fee" placeholder="0.00" style="font-size:16px" />
      </div>
      <div>
        <h5 class="c-text-light mb5">销售价格</h5>
        <c-price :amount="price" class="c-red"></c-price>
      </div>
    </div>
    <c-submit class="primary plr20" label="提交" :submit="_submit" :disabled="_disabled">提交</c-submit>   

  </c-modal>
</template>


<script>
import { CModal, CIcon, CXsdImage, CPrice, CLabel, CSubmit } from 'components'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    item: {
      type: Object
    }
  },
  data(){
    const fee = (!!this.item.agent)?this.item.agent.fee:''
    return {
      fee
    }
  },
  computed: {
    price(){
      return this._disabled?0.00:(parseFloat(this.item.price)+parseFloat(this.fee))
    },
    _disabled(){
      return !this.xsd.regex.price.test(this.fee)
    }
  },
  methods: {
    open (opts) {
      this.opts = opts
      this.show = true
    },
    close(clean = false){
      if(clean)
        this.textMessage = null
      
      this.show = false
    },
    _submit(){
      this.xsd.api.post('station/agent', { item:this.item.id, fee:this.fee }).then(data=>{
        this.$emit('mutate', 'update', data.agent)
        this.show = false
      })
    },
    removeAgent(){
      this.xsd.api.delete('station/agent/'+this.item.agent.id).then(data=>{
        this.$emit('mutate', 'delete', data.agent)
        this.show = false
      })
    }
  },
  components: {
    CModal,
    CIcon,
    CXsdImage,
    CPrice,
    CLabel,
    CSubmit
  }
}

</script>