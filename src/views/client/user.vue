<template>
  <div class='page-wrapper bg-gray-light'>

	<div class="table-row p20">
		<c-xsd-avatar :src="profile.img"></c-xsd-avatar>	
		<div class="extend pl20">
			<h2>{{profile.name}}</h2>
			<h5 class="mt5 c-text-light">{{user.uid}}</h5>
		</div>
	</div>

  </div>
</template>

<script>
  import { CPane, CCell, CButton, CXsdAvatar } from 'components'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
    	...mapGetters(['user','profile']),
    },
	route: {
		activate (transition) {
		    this.$navbar.setNavOptions([
		      { icon:'material-exit_to_app', click:this.logout },
		    ])
			transition.next()
		}
	},
    methods: {
      logout() {
      	this.xsd.user.logout()
      }
    },
	components: {
		CPane,
		CCell,
		CButton,
		CXsdAvatar
	}    
}
</script>