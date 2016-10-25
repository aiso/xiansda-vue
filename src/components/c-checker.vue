<template>
	<a @click="_click">
		<c-icon :name="checked?'material-check_box':'material-check_box_outline_blank'" :class="css"></c-icon>
	</a>
</template>

<script>
import CIcon from './c-icon'
export default {
  props: {
    checked: {
      type: Boolean,
      twoWay:true,
      default: false
    },
    click: {
    	type: Function,
    	default: null
    }
  },
  computed: {
    css(){
      return this.checked?'block c-text':'block c-text-light'
    }
  },
  methods: {
  	_click(){
  		if(!!this.click) this.click()
  		this.checked=!this.checked
  	}
  },
  components: {
  	CIcon
  }
}
</script>

