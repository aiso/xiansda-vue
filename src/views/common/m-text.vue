<template>
  <c-modal :show.sync='show' :actions="null">
    <div class="flex-row mb10">
      <c-icon name="material-textsms" class="block"></c-icon>
      <div class="flex-auto text-left pr10">
        <h4 class="c-text-light">{{opts.title}}</h4>
      </div>
      <div>
        <c-submit class="primary small plr10" label="提交" :submit="_submit" :disabled="_disabled">提交</c-submit>  
      </div>
      
    </div>
    <div class="mb10">
      <textarea style="width:100%;resize: none;" class="input-simple bg-gray-light p10"
        v-autosize="value||''"
        v-model="textMessage"
        debounce="500"></textarea>
    </div>

  </c-modal>
</template>


<script>
import { CModal,CIcon, CSubmit } from 'components'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      opts:{
        title: '文本信息'
      },
      textMessage:''
    }
  },
  computed: {
    _disabled(){
      return this.textMessage.length == 0
    }
  },
  methods: {
    open (opts) {
      this.opts = opts
      this.show = true
    },
    close(clean = false){
      if(clean)
        this.textMessage = null
      
      this.show = false
    },
    _submit(){
      if(typeof(this.opts.callback) == 'function')
        this.opts.callback(this.textMessage)
    }
  },
  components: {
    CModal,
    CIcon,
    CSubmit
  }
}

</script>