<template>
  <c-button :class="class" :disabled="_disabled" @click="_click">{{_label}}</c-button>
</template>

<script>
import CButton from './c-button'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'OK'
    },
    loading: {
      type: String,
      default: '请求中...'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    submit: {
      type: Function,
      default: ()=>{ return true }
    }
  },
  data(){
    return{
      progress:false
    }
  },
  computed:{
    _label(){
      return this.progress?this.loading:this.label
    },
    _disabled(){
      return this.progress || this.disabled
    }
  },
  methods: {
    _click(){
      this.progress = true
      promisify(this.submit()).then(() => { 
        this.progress = false 
      })
    }
  },
  components: {
    CButton
  }
}

function promisify (val) {
  if (!val) {
    return val === false ? Promise.reject(val) : Promise.resolve(val)
  }

  if (typeof val.then === 'function') {
    return val
  }

  return Promise.resolve(val)
}

</script>

