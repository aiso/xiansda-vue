<template>
  <div>
    <c-pane>
      this is test frame 2
      <a @click='c2'>callback2</a>
    </c-pane>
    <div class='frame-footer'>
      <button class="btn icon" @click="close" type="button">
          <c-icon name='material-clear'></c-icon>
      </button>
      <h1 class="title">test frame</h1>
    </div>
  </div>
</template>

<script>
import { CPane, CButton, CIcon } from 'components'

export default {
  props : {
    callback : {
      type : Function,
      default : () => true
    }

  },
  methods: {
    close () {
      this.callback('close');
    },
    c2 () {
      this.callback('event', { aa:'dddd' });
    }
  },
  components: {
    CPane,
    CButton,
    CIcon
  }
}
</script>

