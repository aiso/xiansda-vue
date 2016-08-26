<template>
  <div :class="['c-frame', class]" v-if='toggle' transition="right-in">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    toggle:{
      type:Boolean,
      twoWay:true
    },
    title: {
      type: String
    }
  },
  computed: {
  	navigation (){
  		return Object.assign({
        title:this.title,
        navButton:{
  				icon:'material-arrow_back',
  				click: () => {
  					this.toggle = false;
  				}
		   },
  			navOptions:[]
  		}, this.$children.navigation)
  	}
  },
  watch:{
  	toggle(val){
  		if(val === true){
  			this.$navbar.pushNav(this.navigation)
  		}else{
  			this.$navbar.popNav()
  		}
  	}
  }
}
</script>

<style src="styles/components/frame"></style>
