<template>
  <div :class="['c-multiline', class]">
    <textarea class="c-multiline-textarea"
    	v-autosize="value||''"
      :field="field"
      @change="_validate"
      v-model="value"
      v-bind="attrs"
      debounce="500"></textarea>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/multiline"></style>
