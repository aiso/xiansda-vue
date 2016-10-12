<template>
  <div :class="['c-price', class]">
    <slot></slot>
    <span class="c-price-currency">{{pref}}</span><span class="c-price-amount">{{ amount | currency '' }}</span>
  </div>
</template>


<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    pref: {
      type: String,
      default: '￥'
    },
    amount: {
      type: [String, Number],
      default: '0.00'
    }
  }
}
</script>

<style src="styles/components/price"></style>

