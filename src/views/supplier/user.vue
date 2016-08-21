<template>
	<div class='page-wrapper'>
	  <c-pane>
	  	<c-cell>
	  		<c-button class="primary fit small" v-link="'/logout'">logout</c-button>
		</c-cell>
	  </c-pane>
	  <c-xsd-navbar title="user"></c-xsd-navbar>
	</div>
</template>

<script>
  import { CPane, CCell, CButton, CXsdNavbar } from 'components'
  import { mapActions } from 'vuex'

  export default {
    computed: {

    },
    methods: {
      ...mapActions(['addToast']),
    },
	components: {
		CPane,
		CCell,
		CButton,
		CXsdNavbar
	}    
}
</script>