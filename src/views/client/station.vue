<template>
  <div class="page-wrapper bg-gray-light">
	<div class="c-layout-center">
		<div class="c-layout-center-content">
			sttt	
		</div>
		
	</div>
  </div>
</template>

<script>
import { CPane, CCell, CIcon, CButton } from 'components'
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
		CIcon,
		CButton
	}     
}
</script>

<style>
.c-layout-center{
	width: 100%;
	height: 100%;
	padding:1rem;
	box-sizing: border-box;
	display: table-row;
}
.c-layout-center-content{
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}
</style>