<template>
  <div class='page-wrapper'>
    <c-pane>
      <a class="list-item" v-for='item in items'  track-by="id" @click="this.viewItemId=item.id">
        <c-xsd-item :item='item'>
          <div slot="right" class="pl10 valign-top">
            <c-price :amount="item.price"></c-price>
          </div>
        </c-xsd-item>
      </a>
    </c-pane>

    <c-frame :toggle.sync='viewItemId' title="商品">
      <v-item-view :itemid.sync='viewItemId'></v-item-view>
    </c-frame>

  </div>
</template>

<script>
import { CPane, CFrame, CPrice, CXsdItem } from 'components'
import { mapGetters } from 'vuex'
import VItemView from './v-item'

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
        this.xsd.api.getCache('station/'+this.profile.station+'/posts').then(data=>{
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
    VItemView,
    CPane,
    CFrame,
    CPrice,
    CXsdItem
  }   
}
</script>