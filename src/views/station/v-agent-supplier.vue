<template>
  <div>
    <div class="p20">
      <div class="p10 text-center" v-if="supplier">
        <c-xsd-avatar :src="supplier.img" class="ib"></c-xsd-avatar>
        <h3>{{supplier.name}}</h3>
      </div>
      <div v-if="items">
        <c-xsd-item :item='item' v-for="item in items" @xsd-item-click="showItemView" class="list-cell">
          <div slot="detail" class="mt5 flex-row">
            <c-price :amount="item.price" class="c-text-light">价格：</c-price>
            <div class="flex-auto"></div>
          </div>
          <div slot="right" >
            <a @click="showItemModal(item)" class="btn ib">
              <div v-if="!item.agent"><c-icon name="material-add" class="block"></c-icon></div>
              <div v-if="item.agent" class="text-center c-orange">
                <c-price :amount="item.agent.fee" ></c-price>
                <h5>代理费</h5>
              </div>
            </a>
          </div>
        </c-xsd-item>      
      </div>
    </div>

    <m-agent-item v-if="agentModal" :show.sync="agentModal" :item="agentItem" @mutate="agentMutate"></m-agent-item>
    <f-item :toggle.sync="toggleFrameItem" :itemid="showItemId"></f-item>

  </div>
</template>

<script>
import { CFrame, CPane, CCell, CIcon, CPrice, CXsdItem, CXsdAvatar } from 'components'
import MAgentItem from './m-agent-item'
import FItem from './f-item'

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
      showItemId:0,
      toggleFrameItem:0
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
    agentMutate(event, agent){
      const idx = this.items.findIndex(item=>item.id == agent.item)
      if(event == 'update'){
        this.items.$set(idx, Object.assign({ }, this.items[idx], { agent }))
      }else if(event == 'delete'){
        this.items.$set(idx, Object.assign({ }, this.items[idx], { agent:null }))
      }
    },
    showItemView(item){
      this.showItemId=item.id
      this.toggleFrameItem = 1
    },    
  },
  components: {
    FItem,
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

