<template>
  <div :class="['c-toolbar', class]">
    <button class="btn icon" @click="historyBack"
      type="button">
        <c-icon name='material-arrow_back'></c-icon>
    </button>
  	<h1 class="title">{{title}}</h1>
  	<slot></slot>
  </div>
</template>

<script>
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    title:{
    	type:String,
    	default: ''
    }
  },
  methods: {
    historyBack () {
      history.back()
      //console.log(window)
      //$route.router.go(window.history.back())
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/toolbar"></style>
