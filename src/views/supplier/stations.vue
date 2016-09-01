<template>
	<div class='page-wrapper bg-gray-light'>
    <div class="bg-white p20">
      <h3 class="mb10">供应站点管理</h3>
      <p class="c-text-light">首先要说明的是你的产品并非全网供应，而是定点供应。为什么要这么做？因为只有定点供应您才有能力控制物流成本，多单可以在一次物流中完成，大大节约成本。而且定点供应您可以针对不同的供应点指定不同的价格策略，销售可以更加灵活。</p>
    </div>

    <c-xsd-item :item="station" v-for="station in myStations" class="bg-white border-top p10">
      <p slot="subTitle">{{station.address}}</p>
      <div slot="right">
        <a @click="removeStation(station.id)"><c-icon name="material-delete_forever" class="block"></c-icon></a>
      </div>
    </c-xsd-item>
    <c-frame :toggle.sync='addStationMap' title='添加供应站'>
      <v-map-select :markers="markers" :on-select='addStation'></v-map-select> 
    </c-frame>
    <c-frame :toggle.sync='showStationMap' title='供应站'>
      <v-map :location="mapLocation" ></v-map> 
    </c-frame>
	</div>
</template>


<script>
import { CPane, CCell, CIcon, CXsdItem, CXsdAvatar, CFrame } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VMapSelect from '../common/v-map-select'
import VMap from '../common/v-map'
import { StringArray } from 'utils/string'

export default {
  data(){
    return {
      addStationMap: 0,
      showStationMap: 0,
      allStations:null,
      mapLocation:null
    }

  },
  computed: {
  	...mapGetters(['profile']),
    myStations(){
      if(!this.allStations) return []

      const stations = this.allStations.filter(station=>this.profile.stations.findIndex(sid=>sid==station.id)>=0)
      return stations.map(station=>{
        return { 
          id:station.id, 
          avatar:station.img, 
          address:station.address,
          button:{
            title:station.name,
            click:()=>{
              console.log(station.id)
              this.mapLocation = {
                title:station.name,
                geohash:station.geohash,
                avatar:station.img, 
                subTitle:station.address
              }
              this.showStationMap = 1
            }
          }
        }
      })      
    },
    markers(){
      const stations = this.allStations.filter(station=>this.profile.stations.findIndex(sid=>sid==station.id)<0)
      return stations.map(station=>{
        return { 
          label:station.name, 
          geohash:station.geohash, 
          id:station.id, 
          img:station.img, 
          address:station.address
        }
      })
    }
  },
  route: {
    activate (transition) {
        this.xsd.api.getCache('stations').then( data => {
          this.allStations = data.stations
        } ) 

        this.$navbar.setNavOptions([
          { icon:'material-add', click: ()=>this.addStationMap=1 },
        ])

      transition.next()
    }
  },
  methods: {
    ...mapActions(['setProfile']),
    addStation(id) {
      this.addStationMap = 0;

      this.xsd.api.post('supplier/station', { station:id }).then(data=>{
        const stations = this.profile.stations.slice(0)
        stations.push(id);
        this.setProfile(Object.assign({ }, this.profile, { stations }))
      })
    },
    removeStation(id){
      this.$confirm.open('确实停止供应此站点？').then(()=>{
        this.xsd.api.delete('supplier/station/'+id).then(data=>{
          const stations = this.profile.stations.slice(0).filter(sid=>sid!=id)
          this.setProfile(Object.assign({ }, this.profile, { stations }))
        })
      })
    }

  },
	components: {
		CPane,
		CCell,
		CIcon,
		CXsdItem,
		CXsdAvatar,
    CFrame,
    VMap,
    VMapSelect
	}    
}
</script>