<template>
  <c-frame :toggle.sync="toggle" title="商品">
    <div v-if="item">
      <c-item-view :item='item'>
        <div class="text-center">
          <c-item-agent :item="item" :agent="agent"></c-item-agent>
        </div>
      </c-item-view>

      <c-xsd-nav-button>
        <a @click="showModal=true"><c-icon name="material-shopping_cart" class="block"></c-icon></a>
      </c-xsd-nav-button>

      <m-order :show.sync="showModal" :item="item" :agent="agent"></m-order>
    </div>
  </c-frame>
</template>

<script>
import { CFrame, CIcon, CXsdNavButton, CXsdService } from 'components'
import CItemView from '../item/c-view'
import CItemAgent from './c-item-agent'
import MOrder from './m-order'

export default {
  props : {
    toggle:{
      type:Number,
      twoWay:true
    },
    agent: {
      type: Object
    }
  },
  data () {
    return { 
      item:null,
      showModal:false,
    }
  },
  watch: {
    toggle(v){
      if(v > 0){
        if(!this.item || this.item.id != this.agent.item){
          this.xsd.item.get(this.agent.item).then(item=>{
            this.item = item
          })
        }
      }
    }
  },
  methods: {

  },
  components: {
    CFrame,
    CIcon,
    CXsdNavButton,
    CXsdService,
    CItemView,
    MOrder,
    CItemAgent
  }  

}
</script>