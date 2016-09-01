<template>
  <div :class="['c-modal', class]" v-show="show" transition="fade">
    <c-mask v-if="backdrop" v-show="show"
      @touchend.prevent="show = false"
      transition="fade"></c-mask>

    <div v-show="show" class="c-modal-content" transition="slide-up">
      <h3>发布产品</h3>
      <c-validation
        :validation="$validation"></c-validation>
      <c-form
        :submit="post"
        :cells="cells"
        :items="fields"
        class="c-form-expand"
        @mutate="mutate">
        <c-pane dir="vertical" slot="footer">
          <c-button :class="action.class"
            :type="action.type"
            :disabled="action.disabled">{{action.label}}</c-button>
        </c-pane>
      </c-form>
    </div>
  </div>
</template>

<script>
import { CMask, CValidation, CForm, CPane, CButton } from 'components'

export default {
  props : {
    show : {
      type : Boolean,
      twoWay: true,
      default : false
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      fields: {
        price: ''
      }
    }
  },
  computed:{
    cells () {
      return {
        price: {
          icon: 'user',
          type: 'textfield',
          attrs: {
            placeholder: '发布价格'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入发布价格'
            },
            minlength: {
              rule: 4,
              message: '产品不能少于 4 个字符'
            },
            maxlength: {
              rule: 256,
              message: '产品不能多于 256 个字符'
            },
            pattern: {
              rule: '/^[0-9]{1,7}(\.[0-9]{1,2})?$/',
              message: '价格不符合规则'
            }            
          }
        }
      }
    },
    action () {
      return {
        type: 'submit',
        class: 'primary',
        label: this.progress ? '提交中...' : '提交',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    post(){
      if (!this.payload) {
        return
      }

      this.$validate().then(() => {
console.log(this.payload)        
 
      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    }
  },
  validator: {
    auto: true
  },
  components: {
    CMask,
    CValidation,
    CForm,
    CPane,
    CButton
  }
}
</script>

<style src="styles/components/modal"></style>

