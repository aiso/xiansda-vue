<template>
  <div class="page-wrapper bg-gray-light">
  	<c-layout-center v-if="items.length==0">
	  <c-icon name="fa-shopping-basket" class="icon"></c-icon>
	  <h3 class="mb20 c-text-light">饥肠辘辘啊</h3>
  	</c-layout-center>
  </div>
</template>

<script>
import { CLayoutCenter, CIcon } from 'components'
import { mapActions, mapGetters } from 'vuex'

export default {
  data(){
  	return{
  		items:[]
  	}
  },
  computed: {
  	...mapGetters(['cart'])
  },
  route: {
    activate (transition) {
      this.items = this.cart.map(item=>{
      	return{

      	}
      })
      console.log(this.items)
    	
    }
  },
  methods: {
	...mapActions(['addToast']),
  },
  components: {
  	CLayoutCenter,
  	CIcon
  }

}
</script>