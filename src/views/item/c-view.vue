<template>
  <div>
    <c-swipe v-if="!!item.images && item.images.length" class='swipe' :auto="4000">
      <c-swipe-item v-for="image in item.images">
        <c-xsd-image :src='image.url' :width='slideWidth' height=200 style="overflow: visible"></c-xsd-image>
      </c-swipe-item>
    </c-swipe>
    <c-pane>
    <div class="table-row">
      <div class="extend">
        <h3>{{item.title}}</h3>  
      </div>
      <slot name="title"></slot>
    </div>
    <slot name="description"></slot>
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