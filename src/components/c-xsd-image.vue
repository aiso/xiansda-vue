<template>
  <div :class="['c-xsd-image', class]" :width="width" :height="height" :title="title" :alt="alt">
    <img class="c-image-img"
      :src="src"
      @load="_load">
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: 'images/noimg.jpg'
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    ratio: {
      type: [String, Number],
      default: ''
    },
    letterBox: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    _load ($event) {
      //console.log('width='+this.width+',height='+this.height);
      const img = $event.path[0]
      const w = this.width||img.parentNode.style.width||img.parentNode.clientWidth
      const h = (!!this.ratio)?(w*this.ratio):(this.height||img.parentNode.style.height||img.parentNode.clientHeight)
      const cRatio = w/h;
      //console.log('w='+w+',h='+h+',cRatio='+cRatio);

      getSize(img.src).then(({ width, height }) => {
        const ratio = width / height
        if(this.letterBox){
          const scale = (ratio > cRatio)?(h/height):(w/width) // ratio > cRatio 原图宽比例较大，以高度比例缩放
          //console.log(scale)
          const imgWidth = width*scale
          const imgHeight = height*scale

          img.style.width = imgWidth+'px'
          img.style.height = imgHeight+'px'

          if(ratio > cRatio){ // 宽位移
            img.style.left = -(imgWidth - w)/2+'px';
            img.style.top = '0px';
          }else{
            img.style.top = -(imgHeight - h)/2+'px';
            img.style.left = '0px';
          }

        }else{
          img.style.width = w+'px'
          img.style.height = (img.width / ratio) + 'px'
        }
      })
    }
  }
}

function getSize (src) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = function () {
      reject(null)
    }
    img.src = src
  })
}
</script>

<style src="styles/components/xsd-image"></style>
