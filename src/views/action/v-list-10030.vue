<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <div v-if="items.length>0">
      <c-list-header :action-id="actionId"></c-list-header>
      <c-pane>
        
      </c-pane>
    </div>

  </div>
</template>

<script>
import { CPane, CIcon, CCell, CXsdItem, CListItem, CXsdBackground } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CListHeader from './c-list-header'

export default {
  data(){
    return {
      actionId:10030,
      workTranses:[],
      items:[1],
      itemAllChecked:false
    }
  },
  computed: {
    ...mapGetters(['transes']),
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CXsdItem,
    CListItem,
    CListHeader,
    CXsdBackground,
  } 
}
</script>