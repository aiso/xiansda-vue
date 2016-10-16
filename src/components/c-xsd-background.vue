<template>
  <div :class="['c-xsd-background', class]">
    <c-icon :name="_icon"></c-icon>
    <h2 class="title">{{_title}}</h2>
    <p class="description">{{description}}</p>
    <slot></slot>
  </div>
</template>


<script>
import CIcon from 'components/c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'material-error_outline'
    },
    title: {
      type: String,
      default: '鲜时达'
    },
    description: {
      type: String,
      default: ''
    },
    statement: {
      type: Object,
      default:null
    }
  },
  computed: {
    _icon(){
      return !!this.statement?this.statement.icon:this.icon
    },
    _title(){
      return !!this.statement?this.statement.title:this.title
    }    
  },
  components: {
    CIcon
  }
}
</script>

<style src='styles/components/xsd-background'></style>