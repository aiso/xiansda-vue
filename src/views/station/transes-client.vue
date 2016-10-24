<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="clientTranses.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="clientTranses.length>0">
      <div class="flex-row p15" v-if="client">
        <c-xsd-avatar :src="client.img" size=50></c-xsd-avatar>
        <div class="plr20 flex-auto">
          <h4>{{client.name}}</h4>
          <h5 class="c-text-light text-lh20">服务站：<c-xsd-profile-name :uid="client.station"></c-xsd-profile-name></h5>
        </div>
      </div>
      <c-cell v-for='trans in clientTranses' class="padding-tb">
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
import { CPane, CIcon, CCell, CXsdItem, CXsdAvatar, CXsdProfileName, CXsdBackground } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CActionStatus from '../action/c-status'

export default {
  data(){
    return {
      client:null
    }
  },
  route:{
    data(transition){
      this.xsd.api.get('user/profile/'+this.$route.params.id).then(data=>{
        transition.next({
          client:data.profile
        })
      })
    }
  },
  computed: {
    ...mapGetters(['transes']),
    clientTranses(){
      return this.transes.filter(trans=>trans.client==this.$route.params.id)
    }
  },
  methods:{
    goTrans(trans){
      this.xsd.service.get(trans.item.service).route('trans', { id:trans.id })
    }
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CXsdItem,
    CXsdAvatar, 
    CXsdProfileName,
    CActionStatus,
    CXsdBackground,
  } 
}
</script>