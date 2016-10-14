<template>
   <component :is="'CItemAgent'+item.service" :item="item" :agent="agent"></component>
</template>

<script>
import PropsItemAgent from 'mixins/props-item-agent'
import CItemAgent101 from '../s101/c-item-agent'

export default {
  mixins: [PropsItemAgent],
  components:{
  	CItemAgent101
  }
}
</script>

