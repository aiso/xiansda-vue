<template>
  <div v-el:xsd-map :class="['c-xsd-map', class]"></div>
</template>

<script>
import bmap from 'utils/baidu-map'
import CIcon from './c-icon'


export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    center: {
      type: Object
    },
    markers: {
      type: Array,
      default:[]
    },
    markerClick:{
      type: Function
    }
  },
  data(){
    return {
      map:null
    }
  },
  attached () {
    const opts = Object.assign({
      lat:24.46,
      lng:118.1
    }, this.center)

    bmap.init(this.$els.xsdMap, opts).then( map => {
      //pin = map.createPin('images/marker_red_sprite.png', { width:36,height:36 });
      this.markers.forEach( m => {
          const marker = map.addMarker({ label:m.label, geohash:m.geohash });
          marker.addEventListener("click", e => {
            map.centerAndZoom(e.target.point,16);
            if(!!this.markerClick) this.markerClick(m)
          });
      })

    })
  },
  components: {
    CIcon,
  }
}
</script>

<style src="styles/components/xsd-map"></style>