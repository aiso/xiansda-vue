<template>
  <div :class="['c-frame', class]" v-if='toggle' transition="right-in">
    <slot></slot>
    <c-xsd-navigator :title="navigator.title">
      <a slot="navButton" @click="navigator.navButton.click">
        <c-icon :name="navigator.navButton.icon" class="block"></c-icon>
      </a>
    </c-xsd-navigator>
  </div>
</template>

<script>
import CXsdNavigator from './c-xsd-navigator'
import CIcon from './c-icon'

export default {
  props:{
    toggle:{
      type:Number,
      twoWay:true
    },
    title: {
      type: String
    }
  },
  computed: {
  	navigator (){
      return {
        title:this.title,
        navButton:{
          icon:'material-clear',
          click: () => {
            this.toggle = 0;
          }
        }
      }
    }
  },
  components: {
    CXsdNavigator,
    CIcon,
  }
}
</script>

<style src="styles/components/frame"></style>
