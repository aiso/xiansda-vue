<template>
  <div>
  <c-pane>
    this is test frame
  </c-pane>
  </div>
</template>

<script>
import { CPane, CButton } from 'components'

export default {
  methods: {
    close () {
      console.log(close);

    }
  },
  components: {
    CPane,
    CButton
  }
}
</script>

