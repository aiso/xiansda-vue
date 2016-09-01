<template>
    <div :class="['c-xsd-header', class]">
        <div class="c-xsd-header-title">
          {{title}}
        </div>
        <div class="c-xsd-header-button">
          <slot name="leftButton"></slot>
        </div>
        <div class="c-xsd-header-button right">
          <slot name="rightButton"></slot>
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
          default: '鲜时达'
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

<style src='styles/components/xsd-header'></style>