<template>
	<div class='page-wrapper bg-gray-light'>
    <div class="bg-white p20">
      <h3 class="mb10">供应站点管理</h3>
      <p class="c-text-light">首先要说明的是你的产品并非全网供应，而是定点供应。为什么要这么做？因为只有定点供应您才有能力控制物流成本，多单可以在一次物流中完成，大大节约成本。而且定点供应您可以针对不同的供应点指定不同的价格策略，销售可以更加灵活。</p>
    </div>
    <div></div>

    <c-frame :toggle.sync='showMap'>
      <v-map-select :markers="markers" :on-select='addStation'></v-map-select> 
    </c-frame>
	</div>
</template>


<script>
import { CPane, CCell, CIcon, CListItem, CXsdAvatar, CButton, CFrame } from 'components'
import { mapGetters, mapActions } from 'vuex'
import VMapSelect from '../common/v-map-select'

export default {
  data(){
    return {
      showMap: false,
      stations:null
    }

  },
  computed: {
  	...mapGetters(['auth']),
    markers(){
      return this.stations.map(station=>{
        return { label:station.name, geohash:station.geohash, id:station.id, img:station.img }
      })
    }
  },
  route: {
    activate (transition) {
        this.xsd.api.getCache('stations').then( data => {
          this.stations = data.stations
        } ) 

        this.$navbar.setNavOptions([
          { icon:'material-add', click: ()=>this.showMap=true },
        ])

      transition.next()
    }
  },
  methods: {
    ...mapActions(['setAuth']),
    addStation(id) {
      this.showMap = false;

      const stations = (!!this.auth.supplier.stations && this.auth.supplier.stations.length>0)?this.auth.supplier.stations.splite(','):[]
      
      this.xsd.api.post('supplier/profile', {stations})

      console.log('you pick '+id);

    }
  },
	components: {
		CPane,
		CCell,
		CIcon,
		CListItem,
		CXsdAvatar,
		CButton,
    CFrame,
    VMapSelect
	}    
}
</script>