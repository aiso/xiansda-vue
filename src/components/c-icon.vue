<template>
    <icon v-if="name" :class="['c-icon', class]" :name="name"></icon>
</template>


<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  components: {
    "icon": require("vue-icons")
  }
}
</script>

<style src="styles/components/icon"></style>

