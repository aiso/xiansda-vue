<template>
	<div class='page-wrapper bg-gray-light'>

	<div class="table-row p20">
		<c-xsd-avatar></c-xsd-avatar>	
		<div class="extend pl20">
			<h3>{{auth.supplier.name}}</h3>
			<h5 class="mt5 c-text-light">{{auth.uid}}</h5>
		</div>
	</div>


	<a class="list-item bg-white" >
		<c-list-item title="供应站点" icon="material-store_mall_directory">
			<h3 slot="addition" class="plr20">3</h3>
		</c-list-item>
	</a>




	  <c-xsd-navbar>
	  	<div slot="right">
	  		<a @click="logout"><c-icon name="material-exit_to_app" class="block"></c-icon></a>
	  	</div>
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