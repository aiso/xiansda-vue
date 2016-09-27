<template>
  <a :class="['c-btn-circle', class]" @click="_click">
    <c-icon :name="button.icon" :class="button.color"></c-icon>
    <h5 class="c-btn-circle-label">{{button.title}}</h5>
  </a>
</template>

<script>
import CIcon from './c-icon'
import promisify from './promisify'

export default {
  mixins: [promisify],
  props: {
    class: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: 'material-done'
    },
    color: {
      type: String, 
      default: 'blue'
    },
    title: {
      type:String,
      default:''
    },
    click: {
      type: Function,
      default: ()=>{ return true }
    }    
  },
  data(){
    return{
      progress:false
    }
  },
  computed: {
    button(){
      return this.progress?{ icon:'material-import_export', title:'处理中', color:'bg-text' }:{ icon:this.icon, title:this.title, color:'bg-'+this.color }
    }
  },
  methods: {
    _click(){
      if(this.progress) return

      this.progress = true
      this.promisify(this.click()).then(() => { 
        this.progress = false 
      })
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/btn-circle"></style>
