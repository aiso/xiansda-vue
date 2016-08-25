<template>
	<div class='page-wrapper bg-gray-light'>
	stations

	  <c-xsd-navbar>

	  </c-xsd-navbar>
	</div>
</template>

<script>
  import { CPane, CCell, CIcon, CListItem, CXsdAvatar, CButton, CXsdNavbar } from 'components'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
    	...mapGetters(['auth'])
    },
    methods: {
      ...mapActions(['setAuth']),
      logout() {
      	this.$confirm.open('确实要退出登录？').then(()=>{
      		this.setAuth(null)
      		this.$route.router.go('/')
      	})
      }
    },
	components: {
		CPane,
		CCell,
		CIcon,
		CListItem,
		CXsdAvatar,
		CButton,
		CXsdNavbar
	}    
}
</script>