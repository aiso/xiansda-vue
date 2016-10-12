<template>
  <div v-if="item">
    <div class="flex-row p10 bg-gray-light border-bottom">
      <div class="flex-auto plr10">
        <c-price :amount="item.price" ><span class="c-text-light">商品成本：</span></c-price>
        <c-price :amount="agent.fee" ><span class="c-text-light">代理费用：</span></c-price>
      </div>
      <a class="icon" @click="removeAgent">
          <c-icon name="material-delete_forever" class="block"></c-icon>
      </a>
      <a class="icon" @click="mutate('edit')">
          <c-icon name="material-edit" class="block"></c-icon>
      </a>
    </div>
  	<c-item-view :item="item"></c-item-view>

  </div>
</template>


<script>
import { CIcon, CPrice, CXsdNavButton } from 'components'
import CItemView from '../item/c-view'

export default {
  props: {
    agent: {
      type: Object,
    }
  },
  data(){
    return {
      item:null
    }
  },
  attached(){
    this.xsd.item.get(this.agent.item.id).then(item=>{
      this.item = item
    })
  },
  methods: {
    mutate (event) {
      this.$emit('mutate', event, this.activityItem.id)
    },
    removeAgent(){
      this.$confirm.open('确实要取消代理？').then(()=>{
        this.xsd.api.delete('station/agent/'+this.agent.id).then(data=>{
          this.$emit('mutate', 'deleteAgent', this.agent.id)
        })
      })
    }
  },
  components: {
  	CIcon,
    CPrice,
    CItemView,
    CXsdNavButton
  }
}
</script>