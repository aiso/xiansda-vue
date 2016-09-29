<template>
  <component :is="'CAction'+this.action.action" :action="action"></component>
</template>

<script>
import CAction10010 from './c-action-10010'

export default {
  props: {
    action: {
      type: Object
    },
  },
  components:{
  	CAction10010,
  }
}

</script>