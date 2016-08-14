<template>
  <footer :class="['c-footer', class]">
    <c-route :routes="routes"></c-route>
  </footer>
</template>

<script>
    import { CRoute } from 'components'

    export default {
      props: {
        class: {
          type: String,
          default: 'default'
        },
        routes: {
          type: Array,
          default () {
            return []
          }
        }
      },
      computed: {
        routes () {
          const route = getFooter()
          route.forEach(val => {
            val.title = this.__(val.title)
          })
          return route
        }
      },
      components: {
        CRoute
      }
    }

    const getFooter = () => {
      return [{
        // icon: 'login',
        title: 'client.footer.home',
        name: 'client/home'
      },{
        // icon: 'login',
        title: 'client.footer.cart',
        name: 'client/cart'
      }, {
        // icon: 'login',
        title: 'client.footer.business',
        name: 'client/business'
      }, {
        // icon: 'login',
        title: 'client.footer.user',
        name: 'client/user'
      }]
    }
</script>

<style src='styles/views/footer'></style>