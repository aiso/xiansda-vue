<template>
  <div class="flex-row bg-white" style="padding:30px 15px 0">
    <c-icon :name="action.icon" class="block c-text-light"></c-icon>
    <h4 class="text-ls flex-auto c-text-light">{{action.name}}</h4>
    <slot></slot>
  </div>
</template>

<script>
import { CIcon } from 'components'

export default {
  props: {
    actionId:{
      type: Number
    }
  },
  data(){
    return {
      action:this.xsd.action.config(this.actionId),
    }
  },
  components: {
    CIcon
  }
}
</script>