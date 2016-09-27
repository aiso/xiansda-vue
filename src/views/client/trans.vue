<template>
  <div class='page-wrapper'>
    <c-pane v-if='!transes || transes.length==0' class="text-center">
      <c-icon name='fa-dropbox' class="icon-background"></c-icon>
      <h5 class="text-background">还没有产品？</h5>
    </c-pane>
    <c-cell v-for='trans in transes'>
      <c-xsd-item :item='trans.item' @click="goTrans(trans)">
  		  <h5 slot="subTitle">{{trans.ctime}}</h5>
        <div slot="right" class="pl10">
        	<c-action-status :action="trans.curract"></c-action-status>
        </div>
      </c-xsd-item>
    </c-cell>

  </div>
</template>

<script>
import { CPane, CIcon, CCell, CXsdItem } from 'components'
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
    CActionStatus
  } 
}
</script>