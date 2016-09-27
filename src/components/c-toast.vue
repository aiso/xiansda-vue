<template>
  <div :class="['c-toast', class]"
    :transition="transition"
    v-show="toasts.length">
    <div :class="['toast', toast.class]"
      :transition="transition"
      v-for="toast in toasts"
      track-by="_id">
      <div class="toast-content">
        <h4 v-if="toast.title" class="title">{{toast.title}}</h4>
        <p class="message">{{toast.message}}</p>
      </div>
      <a class="remove" v-if="!!toast.remove" @click="toast.remove" >
        <c-icon name="material-clear"></c-icon>
      </a>
    </div>
  </div>
</template>

<script>
import CIcon from './c-icon'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: 'slide'
    },
    toasts: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/toast"></style>
