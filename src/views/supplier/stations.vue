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



    <c-frame :toggle.sync='showMap'>
      <v-map-select :markers="markers" :on-select='addStation'></v-map-select> 
    </c-frame>
	</div>
</template>


<script>
import { CPane, CCell, CIcon, CXsdItem, CXsdAvatar, CFrame } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VMapSelect from '../common/v-map-select'
import { StringArray } from 'utils/string'

export default {
  data(){
    return {
      showMap: false,
      allStations:null
    }

  },
  computed: {
  	...mapGetters(['auth']),
    myStations(){
      if(!this.allStations) return []

      const mySids = (new StringArray(this.auth.supplier.stations)).array()
      const stations = this.allStations.filter(station=>mySids.findIndex(sid=>sid==station.id)>=0)
      return stations.map(station=>{
        return { title:station.name, id:station.id, avatar:station.img, address:station.address }
      })      
    },
    markers(){
      const mySids = (new StringArray(this.auth.supplier.stations)).array()
      const stations = this.allStations.filter(station=>mySids.findIndex(sid=>sid==station.id)<0)
      return stations.map(station=>{
        return { label:station.name, geohash:station.geohash, id:station.id, img:station.img }
      })
    }
  },
  route: {
    activate (transition) {
        this.xsd.api.getCache('stations').then( data => {
          this.allStations = data.stations
        } ) 

        this.$navbar.setNavOptions([
          { icon:'material-add', click: ()=>this.showMap=true },
        ])

      transition.next()
    }
  },
  methods: {
    ...mapActions(['setAuth']),
    updateStations(stations){
      this.xsd.api.post('supplier/profile', { stations }).then(data=>{
        const newAuth = Object.assign({ }, this.auth)
        newAuth.supplier = data.supplier
        this.setAuth(newAuth);
      })
    },
    addStation(id) {
      this.showMap = false;

      const stations = new StringArray(this.auth.supplier.stations)
      stations.add(id);
      this.updateStations(stations.toString())
    },
    removeStation(id){
      this.$confirm.open('取消发布至该站点？').then(()=>{
        const stations = new StringArray(this.auth.supplier.stations)
        stations.remove(id);
        this.updateStations(stations.toString())
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
    VMapSelect
	}    
}
</script>