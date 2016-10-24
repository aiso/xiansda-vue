<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="items.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="items.length>0">
      <div class="flex-row c-text-light">
        <c-icon name="material-work" class="block"></c-icon>
        <h4 class="text-ls flex-auto">我的服务单</h4>
      </div>
      <c-cell v-for='item in items' v-link="{ name:'station/transes/client', params:{ id:item.uid } }">
        <c-client-trans :uid="item.uid">
          <h2 class="font-montserrat">{{item.transes.length}}</h2>
        </c-client-trans>
      </c-cell>
    </c-pane>

  </div>
</template>

<script>
import { CPane, CIcon, CCell, CXsdItem, CListItem, CXsdBackground } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CClientTrans from './c-client-trans'
import CActionStatus from '../action/c-status'

export default {
  computed: {
    ...mapGetters(['transes']),
    clients(){
      const clients = this.transes.map(trans=>trans.client)
      return Array.from(new Set(clients))
    },
    items(){
      return this.clients.map(client=>{
        const item = { uid:client }
        item.transes = this.transes.filter(trans=>trans.client==client)
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
    CActionStatus,
    CXsdBackground,
    CClientTrans,
  } 
}
</script>