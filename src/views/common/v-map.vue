<template>
  <div>
    <c-xsd-item :item="location" class="bg-white p20 marker-info">
      <p slot="subTitle">{{location.subTitle}}</p>
    </c-xsd-item>
    <c-xsd-map :markers="markers" :options="options" class="map-wrapper"></c-xsd-map>
  </div>
</template>

<script>
import { CXsdItem, CXsdMap, CIcon } from 'components'
export default {
  props: {
    location: {
      type: Object
    }
  },
  data(){
    return{
      markers:[{
        label:this.location.title, 
        geohash:this.location.geohash, 
      }],
      options:{
        geohash:this.location.geohash, 
        zoom:14
      }
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