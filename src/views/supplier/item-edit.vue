<template>
  <div>
    <c-xsd-header :title="title">
      <div slot="leftButton">
        <a @click="close"><c-icon name="material-clear" class="block"></c-icon></a>
      </div>
      <div slot="rightButton" class='pr10'>
        <c-button class="text-button" :class="action.class"
          :type="action.type"
          @click="save"
          :disabled="action.disabled">{{action.label}}</c-button>
      </div>
    </c-xsd-header>
    <c-pane>
      <c-validation
        :validation="$validation"></c-validation>
      <c-form
        :submit="save"
        :cells="cells"
        :items="items"
        class="c-form-expand"
        @mutate="mutate">
      </c-form>
    </c-pane>
  </div>
</template>


<script>
import { CPane, CValidation, CForm, CButton, CIcon, CXsdHeader } from 'components'

export default {
  activate(done) {
    console.log('itemid =' + this.itemid);
    done()
  },
  props : {
    itemid : {
      type : Number,
      default : 0
    },
    callback : {
      type : Function,
      default : () => true
    }

  },
  computed: {
    title () {
      return this.itemid == 0?'新建产品':'编辑产品'
    },
    cells () {
      return {
        title: {
          label: '产品名称',
          icon: 'user',
          type: 'multiline',
          attrs: {
            placeholder: '只能包含小写英文字母'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入产品名称'
            },
            minlength: {
              rule: 4,
              message: '产品不能少于 4 个字符'
            },
            maxlength: {
              rule: 256,
              message: '产品不能多于 256 个字符'
            }
          }
        },
        content: {
          label: '产品描述',
          icon: 'check',
          type: 'multiline',
          attrs: {
            placeholder: '关于产品的描述...'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入产品描述'
            }
          }
        }
      }
    },
    action () {
      return {
        type: 'submit',
        class: 'primary small',
        label: this.progress ? '保存中...' : '保存',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    close () {
      this.callback('close');
    },
    save () {
      console.log(this.payload);
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        this.xsd.api.post('item/'+this.itemid, { title:this.payload.title, content:this.payload.content }).then( data => {
          console.log(data);
          
        }).catch(this.$modal.error)

      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    }
  },
  validator: {
    auto: true
  },
  components: {
    CPane,
    CValidation,
    CForm,
    CButton,
    CIcon,
    CXsdHeader
  }
}
</script>

