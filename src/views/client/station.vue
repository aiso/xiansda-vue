<template>
  <div class="page-wrapper bg-gray-light">
  	<c-layout-center v-if="!station">
  		<c-icon name="material-store_mall_directory" class="icon"></c-icon>
  		<h3 class="text-ls">我的服务站</h3>
  		<p class="c-text text-ls p20">如今电子商务大行其道，老百姓也从电子商务中获得许多实惠和便利。但是电子商务的售后问题一直是一个难以解决的痛点，我们的服务站就是来解决这个问题。首先您就近选择一家服务站作为您的站点，在这站点上有许多商家会在此服务站发布商品，您完成商品购买后都将统一交付至此站点。当您到站点接收商品时可以当场验货，即使交接完成后后面有质量问题，只要是合理申诉都可以直接到此服务站处理。</p>
  		<div class="p20">
  			<c-button class="primary" @click="setupStationMap=1">点击设置</c-button>	
  		</div>
  	</c-layout-center>

  	<div v-if="!!station" class="bg-white">
      <c-xsd-image :src="station.img" style="width:100%;height:200px"></c-xsd-image>
      <div class="p20">
        <h3 class="c-text-light text-ls text-center">{{station.name}}</h3>
        <div class="divider"></div>
        <c-list-item @click="showStationMap=1" :title="station.address" icon="material-home" :arrow-right='true'></c-list-item>
        <c-list-item v-for="contact in station.contacts" :title="contact" icon="material-call" :arrow-right='true'></c-list-item>
      </div>
      
      

      <c-xsd-nav-button >
        <div class="p10">
          <c-button class="primary small" @click="setupStationMap=1">切换</c-button>  
        </div>
      </c-xsd-nav-button>
  	</div>

    <c-frame :toggle.sync='setupStationMap' title='设置供应站'>
      <v-map-select :markers="markers" :on-select='setupStation'></v-map-select> 
    </c-frame>

    <c-frame :toggle.sync='showStationMap' title='供应站'>
      <v-map :location="mapLocation" ></v-map> 
    </c-frame>

  </div>
</template>

<script>
import { CXsdAvatar, CListItem, CIcon, CButton, CLayoutCenter, CXsdNavButton, CXsdImage, CFrame } from 'components'
import { mapActions, mapGetters } from 'vuex'
import VMapSelect from '../common/v-map-select'
import VMap from '../common/v-map'
import { StringArray } from 'utils/string'

  export default {
	data(){
	  return {
	  	allStations:null,
	  	setupStationMap:0,
	  	showStationMap:0
	  }
	},
  	route: {
  	  data(transition){
        this.xsd.api.getCache('stations').then( data => {
          transition.next({
          	allStations: data.stations
          })
        } ) 
  	  }
  	},
    computed: {
      ...mapGetters(['profile']),
      station(){
      	const s = (!!this.profile.station && this.allStations)?this.allStations.find(s=>s.id==this.profile.station):null
        if(!!s) s.contacts = (new StringArray(s.contacts)).array()
        return s
      },
      markers(){
        const stations = this.allStations.filter(station=>station.id!=this.profile.station)
       	return stations.map(station=>{
          return { 
            label:station.name, 
            geohash:station.geohash, 
            id:station.id, 
            img:station.img, 
            address:station.address
		  }
        })
      },
      mapLocation(){
      	return {
	        title:this.station.name,
	        geohash:this.station.geohash,
	        avatar:this.station.img, 
	        subTitle:this.station.address      		
      	}
      }
    },
    methods: {
      ...mapActions(['setProfile']),
      setupStation(station){
      	this.setupStationMap = 0
        this.xsd.api.post('client/profile', { station }).then(data=>{
          this.setProfile(data.client)
        })
      }
    },
	components: {
		VMapSelect,
		VMap,
		CXsdAvatar,
		CListItem,
		CIcon,
		CButton,
		CLayoutCenter,
    CXsdNavButton,
    CXsdImage,
		CFrame
	}     
}
</script>

