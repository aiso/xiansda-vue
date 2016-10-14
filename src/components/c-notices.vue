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
    ...mapGetters(['cart', 'user']),
    notices(){
      const notices = []
      if(!this.user) return notices
        
      if(this.cart.length && this.$route.name != 'client/cart')
        notices.push({
          name:'cart',
          icon:'material-shopping_cart',
          title:this.cart.length,
          click:()=>{
            this.$route.router.go({ name:'client/cart' })
          }
        })
      return notices
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/notices"></style>
