<template>
  <div>
    <c-xsd-item v-if="!!selectMarker" :item="selectMarker" class="bg-white p20 marker-info">
      <p slot="subTitle">{{selectMarker.address}}</p>
      <div slot="right">
        <a @click="onSelect(selectMarker.id)"><c-icon name="material-done" class="block"></c-icon></a>
      </div>
    </c-xsd-item>
    <c-xsd-map :markers="markers" :marker-click="markerClick" class="map-wrapper"></c-xsd-map>
  </div>
</template>

<script>
import { CXsdItem, CXsdMap, CIcon } from 'components'
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
      this.selectMarker = {
        id: marker.id,
        title:marker.label,
        avatar:marker.img,
        address:marker.address
      };
    }
  },
  components: {
    CXsdItem,
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