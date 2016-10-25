<template>
  <div :class="['c-notices', class]">
    <div class="filler"></div>
    <a v-for="notice in notices" v-link="{ name:notice.route }" class="notice"><c-icon :name="notice.icon"></c-icon>{{notice.title}}</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['cart', 'user', 'transes']),
    works(){
      if(!this.user) return []
      return this.transes.filter(trans=>(trans.current.stat==0&&trans.current.user==this.user.id)).map(trans=>trans.current)
    },
    notices(){
      const notices = []
      if(!this.user) return notices
        
      if(this.user.role == this.xsd.static.role.client){
        if(this.cart.length && this.$route.name != 'client/cart')
          notices.push({
            name:'cart',
            icon:'material-shopping_cart',
            title:this.cart.length,
            route:'client/cart'
          })
      }if(this.user.role == this.xsd.static.role.station){


      }

      if(this.works.length > 0){
        this.xsd.action.configs().forEach(a=>{
          const ws = this.works.filter(work=>work.action==a.id)
          if(ws.length > 0 && this.$route.name != a.route)
            notices.push({
              name:a.name,
              icon:a.icon,
              title:ws.length,
              route:a.route
            })
        })
      }

      return notices
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/notices"></style>
