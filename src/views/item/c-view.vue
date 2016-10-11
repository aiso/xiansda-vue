<template>
  <div>
    <c-swipe v-if="!!item.images && item.images.length" class='swipe' :auto="4000">
      <c-swipe-item v-for="image in item.images">
        <c-xsd-image :src='image.url' :width='slideWidth' height=200 style="overflow: visible"></c-xsd-image>
      </c-swipe-item>
    </c-swipe>
    <c-pane>
      <h3 class="text-ls mb20">{{item.title}}</h3>  
      <p class="c-text-light text-ls">{{item.content}}</p>
    </c-pane>
  </div>
</template>

<script>
import { CPane, CSwipe, CSwipeItem, CXsdImage } from 'components'
export default {
  data () {
    return { slideWidth: 400 }
  },
  attached () {
    this.slideWidth = this.$el.clientWidth
  },
  props : {
    item : {
      type: Object,
      default: null
    }
  },
  components: {
    CPane,
    CSwipe,
    CSwipeItem,
    CXsdImage
  }
}
</script>

<style>
  .swipe {
      height: 200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
</style>