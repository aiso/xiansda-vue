<template>
  <c-modal :show.sync='show' :actions='{}'>
    <div class="c-modal-options">
      <c-pane>
        <h2>{{title}}</h2>
        <p class="c-modal-options-sub-title">{{subTitle}}</p>
      </c-pane>
      <c-xsd-item v-for="option in options" :item='option'> 
      </c-xsd-item>
    </div>
  </c-modal>
</template>

<script>
import CPane from './c-pane'
import CModal from './c-modal'
import CXsdItem from './c-xsd-item'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选项'
    },
    subTitle: {
      type: String,
      default: ''
    },
    options: {
      type:Array,
      default: []
    }
  },
  components: {
    CPane,
    CModal,
    CXsdItem
  }
}
</script>


<style src="styles/components/modal-options"></style>