<template>
  <div class='page-wrapper'>
    <c-xsd-navbar :title="title" type="frame">
      <div slot="left">
        <a @click="callback('close')"><c-icon name="material-clear" class="block"></c-icon></a>
      </div>
      <div slot="right">
        <c-button class="text-button" :class="action.class"
          :type="action.type"
          @click="save"
          :disabled="action.disabled">{{action.label}}</c-button>
      </div>
    </c-xsd-navbar>

    <c-pane>
      <c-validation
        :validation="$validation"></c-validation>
      <c-form
        :submit="save"
        :cells="cells"
        :items="fields"
        class="c-form-expand"
        @mutate="mutate">
      </c-form>

      <div class="table-row border-top">
        <div class="extend p20"> 
            <c-label>添加图片</c-label>
        </div>
        <div>
          <a @click="addImage"><c-icon name="material-add" class='block'></c-icon></a>  
        </div>
      </div>
      <div>
        <div class="table-row" v-for="img in images">
          <div class="plr20">
            <c-xsd-image :src="img.url" class="image-square"></c-xsd-image>  
          </div>
          <div class="extend pr10">
            <h4>{{img.name}}</h4>
            <p>{{img.size}}</p>
          </div>
          <div>
            <a class="warning"><c-icon name="material-clear" class="block"></c-icon></a>
          </div>
        </div>
      </div>

    </c-pane>
  </div>
</template>


<script>
import { CPane, CCell, CLabel, CValidation, CForm, CButton, CIcon, CXsdNavbar, CXsdImage } from 'components'
import ImageUtil from 'utils/image'
import ItemSupplierMixin from 'mixins/item-supplier'

export default {
  mixins: [ItemSupplierMixin],
  data () {
    return {
      images: []
    }

  },
  props : {
    callback : {
      type : Function,
      default : () => true
    }

  },
  computed: {
    title () {
      return this.itemid == 0?'新建产品':'编辑产品'
    },
    fields () {

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
    addImage () {
        ImageUtil.select().then( img => {
            this.images.push({ id:0, url:img.dataUrl, name:img.file.name, size:img.file.size })
        }).catch(this.$alert.error)

    },
    save () {
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        this.xsd.api.post('item/'+this.itemid, { title:this.payload.title, content:this.payload.content }).then( data => {
          this.callback('add', data.item);
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
    CCell,
    CLabel,
    CValidation,
    CForm,
    CButton,
    CIcon,
    CXsdNavbar,
    CXsdImage
  }
}
</script>

