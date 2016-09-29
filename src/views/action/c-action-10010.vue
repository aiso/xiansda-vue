<template>
  <div class="table-row">
    <div>
      <c-icon :name="cfg.icon" class="block c-text-light"></c-icon>
    </div>
    <div class="extend plr10" v-if="action.stat == 0">
      <c-price :amount="action.content" class="big"></c-price>
    </div>
    <div class="nowrap">
      <a v-link="{ name:'client/payment' }">付款</a>
    </div>
    <div>
      <c-icon name="material-chevron_right" class="block c-text-light"></c-icon>
    </div>
  </div>
</template>

<script>
import { CIcon, CPrice } from 'components'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      cfg:this.xsd.action.get(this.action.action),
    }
  },
  computed: {

  },
  components:{
  	CIcon,
    CPrice
  }
}

</script>