<template>
  <div>
    <div v-if="!!selectMarker" class="bg-white p20 table-row marker-info">
      <div>
        <c-xsd-avatar :src="selectMarker.img" size=50></c-xsd-avatar>
      </div>
      <div class="extend plr20">
        <h4>{{selectMarker.label}}</h4>
      </div>
      <div>
        <a @click="onSelect(selectMarker.id)"><c-icon name="material-done" class="block"></c-icon></a>
      </div>
    </div>
    <c-xsd-map :markers="markers" :marker-click="markerClick" class="map-wrapper"></c-xsd-map>
  </div>
</template>

<script>
import { CXsdAvatar, CXsdMap, CIcon } from 'components'
export default {
  props: {
    center: {
      type: Object
    },
    markers: {
      type: Array,
      default:[]
    },
    onSelect: {
      type: Function
    }
  },
  data(){
    return{
      selectMarker:null
    }
  },
  methods:{
    markerClick(marker){
      this.selectMarker = marker;
    }
  },
  components: {
    CXsdAvatar,
    CXsdMap,
    CIcon
  }
}
</script>

<style>
.marker-info{
  position: absolute;
  top: 0;
  width: 100%;
  z-index:2;
}
</style>