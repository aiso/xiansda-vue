<template>
  <div :class="['c-toast', class]"
    :transition="transition"
    v-show="toasts.length">
    <div :class="['toast', toast.class]"
      :transition="transition"
      v-for="toast in toasts"
      track-by="_id">
      <h4 v-if="toast.title" class="title">{{toast.title}}</h4>
      <p class="message">{{toast.message}}</p>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style src="styles/components/toast"></style>
