<template>
  <div class='page-wrapper'>
    <div class="p20">
      <h3 class="p10">供应商</h3>
      <c-cell v-for="item in items" @click="showAgentSupplier=item.id" class="padding-tb">
        <c-xsd-item :item='item'>
          <div slot="detail">
            <h5 class="c-text-light mt5">{{item.address}}</h5>
          </div>
          <div slot="right">
              <c-icon name="material-chevron_right"></c-icon>
          </div>
        </c-xsd-item>      
      </c-cell>
    </div>

    <c-frame :toggle.sync="showAgentSupplier" title="代理产品">
      <v-agent-supplier :sid="showAgentSupplier" @mutate="mutate"></v-agent-supplier>
    </c-frame>
  </div> 
</template>

<script>
import { CFrame, CPane, CCell, CIcon, CXsdItem } from 'components'
import VAgentSupplier from './v-agent-supplier'

export default {
  data(){
    return {
      suppliers:null,
      showAgentSupplier: 0      
    }
  },
  route: {
    data (transition) {
      this.xsd.api.getCache('region/1/suppliers').then(data=>{
        transition.next({
          suppliers:data.suppliers
        })
      })
    }
  },
  computed: {
    items(){
      if(!this.suppliers) return []

      return this.suppliers.map(supplier=>{
        return {
          id:supplier.id,
          avatar:supplier.img,
          title:supplier.name,
          address:supplier.address
        }
      })
    }
  },
  methods: {
    mutate(event, data){
      if(event == 'deleteAgent'){
        this.agents = this.agents.filter(agent=>agent.id!=data)
        this.showAgent = 0
      }
    },
  },
  components: {
    VAgentSupplier,
    CFrame,
    CPane,
    CCell,
    CIcon,
    CXsdItem
  }
}
</script>

