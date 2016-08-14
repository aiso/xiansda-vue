<template>
	<div>
	  <c-pane>
	  	<c-cell>
	  		<c-button class="primary fit small" v-link="'/logout'">logout</c-button>
		</c-cell>
	  </c-pane>
	</div>
</template>

<script>
  import { CPane, CCell, CButton } from 'components'
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
		CButton
	}    
}
</script>