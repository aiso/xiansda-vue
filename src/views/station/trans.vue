<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="transes.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="transes.length>0">
      <div class="flex-row c-text-light">
        <c-icon name="material-work" class="block"></c-icon>
        <h4 class="text-ls flex-auto">我的服务单</h4>
      </div>
      <c-cell v-for='item in items' >
        <c-client-trans :uid="item.uid">
          <h2 class="font-montserrat">{{item.transes.length}}</h2>
        </c-client-trans>
      </c-cell>
      <c-cell v-for='trans in transes' class="padding-tb">
        <c-xsd-item :item='trans.item' @click="goTrans(trans)">
          <h5 slot="detail" class="c-text-light">{{trans.ctime|timeago}}</h5>
          <div slot="right" class="pl10 valign-top">
            <c-action-status :action="trans.current"></c-action-status>
          </div>
        </c-xsd-item>
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
  methods:{
    goTrans(trans){
      const service = this.xsd.service.get(trans.item.service)
      this.$route.router.go(service.router('trans', { id:trans.id }))
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