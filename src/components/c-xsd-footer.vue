<template>
    <div :class="['c-xsd-footer', class]">
        <div class="c-xsd-footer-button">
          <slot name="leftButton"></slot>
        </div>
        <div class="c-xsd-footer-button right">
          <slot name="rightButton"></slot>
        </div>
        <div class="c-xsd-footer-title">
          {{title}}
        </div>
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
        title: {
          type: String,
          default: ''
        },
        routes: {
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

<style src='styles/components/xsd-footer'></style>