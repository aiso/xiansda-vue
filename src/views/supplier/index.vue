<template>
  <div class='page-wrapper with-footer'>
    <c-pane v-if="$route.path === '/supplier'">
      welcome supplier
    </c-pane>
  </div>
</template>

<script>
  import { CPane, CGroup, CTitle, CCell, CButton, CToolbar, CFrame } from 'components'
  import { mapActions } from 'vuex'

  export default {
    computed: {

    },
    methods: {
      ...mapActions(['addToast']),
    },
    components: {
      CPane,
    }
}
</script>