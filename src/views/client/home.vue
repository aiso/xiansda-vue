<template>
  <div class='page-wrapper'>
    <c-pane>
      <div class="flex-row border-bottom list-cell" v-if="station">
        <div>
          <c-xsd-avatar :src="station.img" size=40></c-xsd-avatar>
        </div>
        <div class="flex-auto plr20">
          <h3 class="text-ls">{{station.name}}</h3>
          <h5 class="c-text-light">服务站</h5>
        </div>
      </div>
      <div v-if="items">
        <c-cell class="padding-tb" v-for="item in items" @click="showItem(item.agent)">
          <c-xsd-item :item='item'>
            <div slot="detail" class="mt5">
              <c-xsd-profile :uid="item.user"></c-xsd-profile>
            </div>
            <div slot="right" class="text-center">
              <c-item-agent :item="item" :agent="item.agent"></c-item-agent>
            </div>
          </c-xsd-item> 
        </c-cell>
      </div>

    </c-pane>
    <f-item :toggle.sync="toggleFrameItem" :agent="showItemAgent"></f-item>
  </div>
</template>

<script>
import { CPane, CCell, CPrice, CXsdItem, CXsdProfile, CXsdAvatar } from 'components'
import FItem from './f-item'
import CItemAgent from './c-item-agent'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      items:[],
      station:null,
      showItemAgent:null,
      toggleFrameItem:0
    }
  },
  route: {
    activate(transition){
      if(!!this.profile.station){
        this.xsd.api.getCache('client/items').then(data=>{
          this.initData(data)
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
  methods: {
    initData(data){
      this.items = data.items
      this.station = data.station
    },
    showItem(agent){
      this.showItemAgent=agent
      this.toggleFrameItem = 1
    }
  },
  components: {
    CPane,
    CCell,
    CPrice,
    CXsdItem,
    CXsdProfile,
    CXsdAvatar,
    FItem,
    CItemAgent
  }   
}
</script>