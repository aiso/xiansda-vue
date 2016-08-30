<template>
	<div class='page-wrapper bg-gray-light'>

	<div class="table-row p20">
		<c-xsd-avatar :src="auth.supplier.img"></c-xsd-avatar>	
		<div class="extend pl20">
			<h3>{{auth.supplier.name}}</h3>
			<h5 class="mt5 c-text-light">{{auth.uid}}</h5>
		</div>
	</div>


	<a class="list-item bg-white" v-link="'/supplier/stations'">
		<c-list-item title="供应站点" icon="material-store_mall_directory">
			<h3 slot="addition" class="plr20" v-if="stations>0">{{stations}}</h3>
			<h4 slot="addition" class="plr20 c-text-light" v-if="stations==0">点击设置</h4>
		</c-list-item>
	</a>


	</div>
</template>

<script>
import { CPane, CCell, CIcon, CListItem, CXsdAvatar, CButton } from 'components'
import { mapGetters, mapActions } from 'vuex'
import { StringArray } from 'utils/string'

  export default {
    computed: {
    	...mapGetters(['auth']),
    	stations(){
    		const stations = new StringArray(this.auth.stations)
    		return stations.count()
    	}
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
		CButton
	}    
}
</script>