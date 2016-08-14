<template>
  <div>
    <c-pane v-if="$route.path === '/client'">
      welcome client
    </c-pane>
    <router-view class="router-view" transition="slide-up" keep-alive></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import { CPane, CGroup, CTitle, CCell, CButton, CToolbar, CFrame } from 'components'
  import VFooter from './v-footer'
  import { mapActions } from 'vuex'

  export default {
    computed: {

    },
    methods: {
      ...mapActions(['addToast']),
    },
    components: {
      CPane,
      VFooter
    }
}
</script>