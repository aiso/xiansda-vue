<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="transes.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-pane v-if="transes.length>0">
      <div class="flex-row c-text-light">
        <c-icon name="material-work" class="block"></c-icon>
        <h4 class="text-ls flex-auto">我的服务单</h4>
      </div>
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
import { CPane, CIcon, CCell, CXsdItem, CXsdBackground } from 'components'
import { mapActions, mapGetters } from 'vuex'
import CActionStatus from '../action/c-status'

export default {
  computed: {
    ...mapGetters(['transes'])
  },
  methods:{
  	goTrans(trans){
      //this.xsd.trans.route(trans)
      this.xsd.service.get(trans.item.service).route('trans' , { id:trans.id })
  		//const service = this.xsd.service.get(trans.item.service)
  		//this.$route.router.go(service.router('trans', { id:trans.id }))
  	}
  },
  components: {
    CPane,
    CIcon,
    CCell,
    CXsdItem,
    CActionStatus,
    CXsdBackground
  } 
}
</script>