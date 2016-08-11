<template>
  <div>
    <c-pane v-if="$route.path === '/demo'">
      <c-group v-for="demo in demos" :title="__(demo.title)" :cells="demo.cells" :items="demo.items"></c-group>
      <c-button @click='test'>test</c-button>
    </c-pane>
    <c-toolbar title="测试模块"></c-toolbar>
    <router-view class="router-view" transition="slide-up" keep-alive></router-view>
  </div>
</template>

<script>
  import { CPane, CGroup, CTitle, CButton, CToolbar } from 'components'
  import { mapActions } from 'vuex'

  export default {
    computed: {
      demos () {
        const { router } = this.$route
        return [{
          title: 'view.home.example',
          cells: [{
            label: 'form',
            value: this.__('demo.form'),
            click () {
              router.go('/demo/form')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'swipe',
            value: this.__('demo.swipe'),
            click () {
              router.go('/demo/swipe')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'iscroll',
            value: this.__('demo.iscroll'),
            click () {
              router.go('/demo/iscroll')
            },
            extra: {
              isLink: true
            }
          }]
        }]
      }
    },
    methods: {
      ...mapActions(['addToast']),
      test () {
        this.xapi.get('test').then(data=>{console.log(data)})
      }
    },
    components: {
      CPane,
      CGroup,
      CTitle,
      CToolbar,
      CButton
    }
}
</script>