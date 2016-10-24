<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="items.length>0">
      <div class="flex-row c-text-light">
        <c-icon :name="config.icon" class="block"></c-icon>
        <h4 class="text-ls flex-auto">{{config.name}}</h4>
      </div>
      <c-cell v-for='item in items' v-link="{ name:'station/transes/client', params:{ id:item.uid } }">
      </c-cell>
    </c-pane>

  </div>
</template>


<script>
import { CPane, CIcon, CCell, CXsdItem, CListItem, CXsdBackground } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CActionStatus from '../action/c-status'

export default {
  data(){
    return {
      actionId:10020
    }
  },
  computed: {
    ...mapGetters(['transes']),
    config(){
      return this.xsd.static.action(this.actionId)
    },
    items(){
      return [1]
      this.transes.filter(trans=>trans.current.action==this.actionId)
    }
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CXsdItem,
    CListItem,
    CActionStatus,
    CXsdBackground,
  } 
}
</script>