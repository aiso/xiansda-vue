<template>
  <div class='page-wrapper'>
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
import { CPane, CCell, CXsdItem } from 'components'
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
    CCell,
    CXsdItem,
    CActionStatus
  } 
}
</script>