<template>
  <div v-if='show' class='c-frame' transition="right-in">
    <slot></slot>
    <div class='c-frame-footer'>
      <button class="btn icon" @click="close" type="button">
          <c-icon name='material-clear'></c-icon>
      </button>
      <h1 class="title">{{title}}</h1>
    </div>
  </div>
</template>

<script>
import CIcon from './c-icon'

export default {
  props : {
    show : {
      twoWay: true,
      type : Boolean,
      default : false
    },
    title : {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.show = false;
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/frame"></style>
