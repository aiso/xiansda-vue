<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <div v-if="items.length>0">
      <c-list-header :action-id="actionId"></c-list-header>
      <c-cell v-for='item in items'>
        <c-client-trans :uid="item.uid">
          <h2 class="font-montserrat">{{item.transes.length}}</h2>
        </c-client-trans>
      </c-cell>
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
    actionTranses(){
      return this.transes.filter(trans=>trans.current.action==this.actionId&&trans.current.stat==0)
    },
    clients(){
      const clients = this.actionTranses.map(trans=>trans.client)
      return Array.from(new Set(clients))
    },
    items(){
      return this.clients.map(client=>{
        const item = { uid:client }
        item.transes = this.actionTranses.filter(trans=>trans.client==client)
        return item
      })
    }
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