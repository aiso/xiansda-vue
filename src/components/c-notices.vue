<template>
  <div :class="['c-notices', class]">
    <div class="filler"></div>
    <a v-for="notice in notices" @click="notice.click" class="notice"><c-icon :name="notice.icon"></c-icon>{{notice.title}}</a>
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
    ...mapGetters(['cart', 'user', 'works']),
    notices(){
      const notices = []
      if(!this.user) return notices
        
      if(this.user.role == this.xsd.static.role.client){
        if(this.cart.length && this.$route.name != 'client/cart')
          notices.push({
            name:'cart',
            icon:'material-shopping_cart',
            title:this.cart.length,
            click:()=>{
              this.$route.router.go({ name:'client/cart' })
            }
          })
      }if(this.user.role == this.xsd.static.role.station){


      }

      if(this.works.length > 0){
        this.xsd.action.all().forEach(a=>{
          const ws = this.works.filter(work=>work.action==a.id)
          if(ws.length > 0)
            notices.push({
              name:a.name,
              icon:a.icon,
              title:ws.length,
              click:()=>{
                console.log(a.id)
              }
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
