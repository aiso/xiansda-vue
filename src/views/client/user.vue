<template>
  <div class='page-wrapper bg-gray-light'>

	<div class="table-row p20 " v-if="!!user">
		<c-xsd-avatar :src="profile.img"></c-xsd-avatar>	
		<div class="extend pl20">
			<h2>{{profile.name}}</h2>
			<h5 class="mt5 c-text-light">{{user.uid}}</h5>
		</div>
	</div>

	<a class="ib bg-white" v-link="'/client/station'" v-if="!!station">
		<c-list-item :title="station.name" icon="material-store_mall_directory">
			<h4 slot="addition" class="plr20 c-text-light">点击查看</h4>
		</c-list-item>
	</a>

  </div>
</template>

<script>
  import { CPane, CCell, CButton, CXsdAvatar, CListItem } from 'components'
  import { mapGetters } from 'vuex'

  export default {
  	data(){
  	  return{
  	  	station:null
  	  }
  	},
    computed: {
    	...mapGetters(['user','profile']),
    },
	route: {
	  data(transition){
	  	if(!!this.profile.station){
	        this.xsd.api.getCache('station/'+this.profile.station).then( data => {
	          transition.next({
	          	station: data.station
	          })
	        } )
	  	}else
	  		transition.next()
	  },
	  activate (transition) {
		this.$root.setNavOptions([
	      { icon:'material-exit_to_app', click:this.logout },
		])
		transition.next()
	  }
	},
    methods: {
      logout() {
        this.$confirm.open('确实要退出登录？').then(()=>{
          this.xsd.user.logout()
          this.$route.router.go('/')
        })
      }
    },
	components: {
		CPane,
		CCell,
		CButton,
		CXsdAvatar,
		CListItem
	}    
}
</script>