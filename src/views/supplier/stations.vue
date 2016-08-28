<template>
	<div class='page-wrapper bg-gray-light'>
    <div class="bg-white p20">
      <h3 class="mb10">供应站点管理</h3>
      <p class="c-text-light">首先要说明的是你的产品并非全网供应，而是定点供应。为什么要这么做？因为只有定点供应您才有能力控制物流成本，多单可以在一次物流中完成，大大节约成本。而且定点供应您可以针对不同的供应点指定不同的价格策略，销售可以更加灵活。</p>
    </div>
    <div v-el:mapdiv style="height:400px">
      
    </div>
	</div>
</template>

<script>
  import { CPane, CCell, CIcon, CListItem, CXsdAvatar, CButton } from 'components'
  import { mapGetters, mapActions } from 'vuex'
  import map from 'utils/baidu-map'

  export default {
    computed: {
    	...mapGetters(['auth'])
    },
  route: {
    activate (transition) {
        this.$navbar.setNavOptions([
          { icon:'material-add', click:this.addStation },
        ])

        var opts = {
          lat:24.46,
          lng:118.1
        };

        map.init(this.$els.mapdiv, opts).then(function(map){

        })

      transition.next()
    }
  },
    methods: {
      ...mapActions(['setAuth']),
      addStation() {

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