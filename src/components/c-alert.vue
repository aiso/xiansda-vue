<template>
  <c-modal :show.sync='show' :actions='actions'>
    <div class="c-alert-content">{{title}}</div>
  </c-modal>
</template>

<script>
import CModal from './c-modal'

export default {
  data(){
      return {
        title:'',
        show: false,
        actions :{
            ok: {
              label: '知道了',
              class: 'default',
              type: 'button'
            }
        }       
      }
  },
  methods: {
    open (title) {
      this.title = title;
      this.show = true;
    }
  },
  components: {
    CModal
  }
}
</script>

<style src="styles/components/alert"></style>
