<template>
  <c-cell class="action row" @click="onAction">
    <c-icon :name="cfg.icon" class="block c-text-light"></c-icon>
    <div class="extend plr10">
      <c-price :amount="action.content" class="big"></c-price>
    </div>
    <span class="c-text-light">{{statement}}</span>
    <c-icon name="material-chevron_right" class="block c-text-light"></c-icon>
  </c-cell>
</template>

<script>
import { CCell, CIcon, CPrice } from 'components'
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
    CPrice
  }
}

</script>