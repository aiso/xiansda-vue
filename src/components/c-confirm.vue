<template>
  <c-modal :show.sync='show' :callback='modalAction'>
    <div class="c-alert-content">{{title}}</div>
  </c-modal>
</template>

<script>
import CModal from './c-modal'

export default {
  data(){
      return {
        title:'',
        show: false
      }
  },
  methods: {
    open (title) {
      this.title = title;
      this.show = true;
    },
    modalAction (key) {
      console.log(key);
    }
  },
  components: {
    CModal
  }
}
</script>

<style src="styles/components/alert"></style>
