<template>
  <div>
home
  </div>
</template>

<script>

  import { mapActions } from 'vuex'

  export default {
    computed: {

    },
    methods: {
      ...mapActions(['addToast']),
    }
}
</script>