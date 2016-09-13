<template>
  <div class='page-wrapper'>
service
  </div>
</template>

<script>
import { CPane, CButton, CIcon,CListItem, CFrame } from 'components'
import { mapActions, mapGetters } from 'vuex'


export default {
  computed:{
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['removeItem', 'addItem', 'updateItem']),
  },
  components: {
    CPane,
    CButton,
    CIcon,
    CListItem,
    CFrame,
  }
}
</script>