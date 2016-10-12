<template>
  <div class="p20">
    <div class="p10 text-center" v-if="supplier">
      <c-xsd-avatar :src="supplier.img" class="ib"></c-xsd-avatar>
      <h3>{{supplier.name}}</h3>
    </div>
    <c-cell v-for="item in items" v-if="items" class="padding-tb" @click="showItemModal(item)">
      <c-xsd-item :item='item' :click="showItem">
        <div slot="detail" class="mt5 flex-row">
          <c-price :amount="item.price" class="c-text-light">价格：</c-price>
          <div class="flex-auto"></div>
        </div>
        <div slot="right">
          <a v-if="!item.agent"><c-icon name="material-add" class="block"></c-icon></a>
          <a v-if="item.agent" class="text-center c-orange">
            <c-price :amount="item.agent.fee" ></c-price>
            <h5>代理费</h5>
          </a>
        </div>
      </c-xsd-item>      
    </c-cell>

    <m-agent-item v-if="agentModal" :show.sync="agentModal" :item="agentItem" @mutate="agentMutate"></m-agent-item>
  </div>
</template>

<script>
import { CFrame, CPane, CCell, CIcon, CPrice, CXsdItem, CXsdAvatar } from 'components'
import MAgentItem from './m-agent-item'

export default {
  props: {
    sid: {
      type: Number
    }
  },
  data(){
    return {
      agentModal:false,
      supplier:null,
      items:null,
      agentItem:null,
    }
  },
  attached(){
    this.xsd.api.get('station/agent/supplier/'+this.sid).then(data=>{
      this.supplier = data.supplier
      this.items = data.items
    })
  },
  methods: {
    showItemModal(item){
      this.agentItem = item
      this.agentModal = true
    },
    agentMutate(agent){
      const idx = this.items.findIndex(item=>item.id == agent.item)
      this.items.$set(idx, Object.assign({ }, this.items[idx], { agent }))
    }
  },
  components: {
    MAgentItem,
    CFrame,
    CPane,
    CCell,
    CIcon,
    CPrice,
    CXsdItem,
    CXsdAvatar
  }
}
</script>

