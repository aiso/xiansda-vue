<template>
  <c-modal :show.sync='show' :callback='modalAction'>
    <div class="c-alert-content">{{title}}</div>
  </c-modal>
</template>

<script>
import Promise from 'nd-promise'
import CModal from './c-modal'

export default {
  data(){
      return {
        title:'',
        show: false,
        deferred:null
      }
  },
  methods: {
    open (title) {
      this.title = title;
      this.show = true;
      return new Promise((resolve, reject) => {
        this.deferred = { resolve, reject }
      })
    },
    modalAction (key) {
      (key == 'submit')?this.deferred.resolve():this.deferred.reject()
    }
  },
  components: {
    CModal
  }
}
</script>

<style src="styles/components/alert"></style>
