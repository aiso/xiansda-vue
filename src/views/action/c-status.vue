<template>
  <div class="text-center nowrap">
    <c-icon :name="cfg.icon" :class="stat"></c-icon>
  </div>
</template>

<script>
import { CIcon } from 'components'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      cfg:this.xsd.action.get(this.action.action),
      stat:this.action.stat?'c-blue':'c-text'
    }
  },
  components:{
  	CIcon,
  }
}

</script>