<template>
  <div class='page-wrapper'>
		businesses

  </div>
</template>

<script>
import { CPane, CIcon } from 'components'
import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions(['addToast']),
    },
    components: {
    	CPane,
    	CIcon
    }
    
}
</script>