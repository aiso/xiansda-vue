<template>
  <component :is="'CAction'+this.action.action" :action="action" :class="class"></component>
</template>

<script>
import CAction10010 from './c-action-10010'

export default {
  props: {
    action: {
      type: Object
    },
    class: {
      type: String,
      default:''
    },
  },
  components:{
  	CAction10010,
  }
}

</script>