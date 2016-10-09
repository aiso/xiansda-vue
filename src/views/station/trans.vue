<template>
  <div class='page-wrapper bg-gray-light'>
    <c-xsd-background v-if="transes.length==0" title="没有进行中的服务单"></c-xsd-background>
    <div v-for='client in clients'>
      <div class="flex-row p10" >
        <c-xsd-avatar :src="client.img" size="40" class="pl10"></c-xsd-avatar>
        <div class="plr20 flex-auto">
        <h4>{{client.name}}</h4>
        </div>
        <c-icon name="material-chevron_right"></c-icon>
      </div>
      <c-cell v-for='trans in client.transes' class="bg-white">
        <c-xsd-item :item='trans.item' @click="goTrans(trans)">
          <h5 slot="subTitle">{{trans.ctime|timeago}}</h5>
          <div slot="right" class="pl10 valign-top">
            <c-action-status :action="trans.curract"></c-action-status>
          </div>
        </c-xsd-item>
      </c-cell>
    </div>
  </div>
</template>

<script>
import { CPane, CIcon, CCell, CXsdItem, CListItem, CXsdBackground, CXsdAvatar } from 'components'
import { mapActions } from 'vuex'
import CActionStatus from '../action/c-status'

export default {
  data(){
    return{
      clients:[],
      transes:[]
    }
  },
  route: {
    data(transition){
      this.xsd.api.getCache('station/trans').then(data=>{
        this.initTrans(data)
        transition.next({
          transes:data.transes,
          clients:this.initTrans(data)
        })
      })
    }
  },
  methods:{
    initTrans(data){
      const clients = data.clients
      clients.forEach(client=>{
        client.transes = data.transes.filter(trans=>trans.client==client.id)
      })
      return clients
    },
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
    CXsdAvatar
  } 
}
</script>