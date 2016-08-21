<template>
  <div class='page-wrapper'>
		businesses
	  <c-xsd-navbar title="test">
	  	<div slot="right">
	  		<a><c-icon name="material-menu" class="block"></c-icon></a>
	  	</div>
	  </c-xsd-navbar>
  </div>
</template>

<script>
import { CPane, CIcon, CXsdNavbar } from 'components'
import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions(['addToast']),
    },
    components: {
    	CPane,
    	CIcon,
    	CXsdNavbar
    }
}
</script>