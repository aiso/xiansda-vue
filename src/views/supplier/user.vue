<template>
	<div class='page-wrapper bg-gray-light'>

	<div class="table-row p20">
		<c-xsd-avatar :src="profile.img"></c-xsd-avatar>	
		<div class="extend pl20">
			<h2>{{profile.name}}</h2>
			<h5 class="mt5 c-text-light">{{user.uid}}</h5>
		</div>
	</div>


	<a class="list-item bg-white" v-link="'/supplier/stations'">
		<c-list-item title="供应站点" icon="material-store_mall_directory">
			<h3 slot="addition" class="plr20" v-if="profile.stations.length>0">{{profile.stations.length}}</h3>
			<h4 slot="addition" class="plr20 c-text-light" v-if="profile.stations.length==0">点击设置</h4>
		</c-list-item>
	</a>


	</div>
</template>

<script>
import { CPane, CCell, CIcon, CListItem, CXsdAvatar, CButton } from 'components'
import { mapGetters } from 'vuex'
import { StringArray } from 'utils/string'

  export default {
    computed: {
    	...mapGetters(['user','profile']),
    },
	route: {
		activate (transition) {
			this.$root.setNavOptions([
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
		CIcon,
		CListItem,
		CXsdAvatar,
		CButton
	}    
}
</script>