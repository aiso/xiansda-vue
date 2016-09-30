<template>
  <c-cell class="action row" @click="onAction">
    <div>
      <c-xsd-avatar :src="action.user.img" size=50></c-xsd-avatar>
    </div>
    <div class="extend plr10">
      <h5 class="sub-title">{{cfg.name}} - {{statement}}</h5>
      <c-price :amount="action.content" class="c-red-dark mt5"></c-price>
    </div>
    <div class="text-center">
      <h5 class="sub-title">{{action.utime|timeago}}</h5>
      <c-icon :name="cfg.icon" class="c-text-light mt5"></c-icon>
    </div>
  </c-cell>
</template>

<script>
import { CCell, CIcon, CPrice, CXsdAvatar } from 'components'
import { mapGetters } from 'vuex'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      cfg:this.xsd.action.get(this.action.action),
    }
  },
  computed: {
    ...mapGetters(['user']),
    statement(){
      return (this.action.stat == 0)?'点击付款':'已付款'
    }
  },
  methods: {
    onAction(){
      if(this.action.stat == 0 && this.user.role == this.xsd.static.role.client)
        this.$route.router.go({ name:'client/payment' })
    }
  },
  components:{
    CCell,
  	CIcon,
    CPrice,
    CXsdAvatar
  }
}

</script>