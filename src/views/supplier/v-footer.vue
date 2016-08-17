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
        icon: 'material-work',
        title: 'supplier.footer.business',
        name: 'supplier/businesses'
      }, 
      {
        icon: 'material-spa',
        title: 'supplier.footer.item',
        name: 'supplier/items'
      },      
      {
        icon: 'material-person',
        title: 'supplier.footer.user',
        name: 'supplier/user'
      }]
    }
</script>

<style src='styles/views/footer'></style>