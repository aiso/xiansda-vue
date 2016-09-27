<template>
  <div class='page-wrapper'>
    <c-cell v-for='item in items'>
      <c-xsd-item :item='item' v-link="{ name:'item', params:{ id: item.id } }">
        <div slot="right" class="pl10 valign-top">
          <c-xsd-item-service :item="item"></c-xsd-item-service>
        </div>
      </c-xsd-item>
    </c-cell>
    
  </div>
</template>

<script>
import { CPane, CCell, CXsdItem } from 'components'
import { mapGetters } from 'vuex'
import CXsdItemService from '../item/c-item-service'

export default {
  data(){
    return{
      items:[],
      viewItemId:0
    }
  },
  route: {
    activate(transition){
      if(!!this.profile.station){
        this.xsd.api.getCache('client/items').then(data=>{
          this.items = data.items
          transition.next()
        })	      
      }
	   else
		    transition.redirect('/client/station')
    }
  },
  computed: {
    ...mapGetters(['user','profile']),
  },
  components: {
    CPane,
    CCell,
    CXsdItem,
    CXsdItemService
  }   
}
</script>