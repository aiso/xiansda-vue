<template>
  <div class='page-wrapper'>
    <c-xsd-background v-if="transes.length==0" title="没有进行中的服务单"></c-xsd-background>
    <c-cell v-for='trans in transes'>
      <c-xsd-item :item='trans.item' @click="goTrans(trans)">
  		  <h5 slot="subTitle">{{trans.ctime|timeago}}</h5>
        <div slot="right" class="pl10 valign-top">
        	<c-action-status :action="trans.curract"></c-action-status>
        </div>
      </c-xsd-item>
    </c-cell>

  </div>
</template>

<script>
import { CPane, CIcon, CCell, CXsdItem, CXsdBackground } from 'components'
import { mapActions } from 'vuex'
import CActionStatus from '../action/c-status'

export default {
  data(){
  	return{
  	  transes:[]
  	}
  },
  route: {
  	data(transition){
  	  this.xsd.api.getCache('client/trans').then(data=>{
  	  	transition.next({
  	  		transes:data.transes
		    })
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
    CActionStatus,
    CXsdBackground
  } 
}
</script>