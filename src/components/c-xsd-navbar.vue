<template>
    <div :class="['c-xsd-navbar', class]">
        <div class="c-xsd-navbar-button">
          <slot name="left"></slot>
        </div>
        <div class="extend">
          <h3>{{title}}</h3>
        </div>
        <div>
          <slot name="right"></slot>
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
        title: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style src='styles/components/xsd-navbar'></style>