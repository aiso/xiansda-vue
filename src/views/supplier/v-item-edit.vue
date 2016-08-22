<template>
  <div class='page-wrapper'>
    <c-xsd-navbar :title="title" type="frame">
      <div slot="left">
        <a @click="callback('close')"><c-icon name="material-clear" class="block"></c-icon></a>
      </div>
      <div slot="right" class="pr10">
        <c-button class="plr10" :class="action.class"
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
      <div v-for="img in images">
        <div class="table-row mb10" v-show="img.delete!==true">
          <div class="plr20">
            <c-xsd-image :src="img.url" class="image-square"></c-xsd-image>  
          </div>
          <div class="extend pr10">
            <h4>{{img.name}}</h4>
            <p>{{img.size}}</p>
          </div>
          <div>
            <a class="warning" @click="img.delete=true"><c-icon name="material-clear" class="block"></c-icon></a>
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
  props : {
    callback : {
      type : Function,
      default : () => true
    }
  },
  data () {
    return {
      images:[]
    }
  },
  activate(done) {
    !!this.item && !!this.item.images && this.item.images.forEach( img =>{
      this.images.push({ id:img.id, url:img.url, name:img.name, size:img.size, delete:false })
    } )
    done();
  },
  computed: {
    title () {
      return this.item.id == 0?'新建产品':'编辑产品'
    },
    fields () {
      return {
        title: this.item.title,
        content: this.item.content,
      }
    },
    imageMutate() {
      var mutate = false
      this.images.forEach(img=>{
        mutate |= (img.id == 0 || img.delete === true)
      })
      return mutate
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
          value: this.item.content,
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
            this.images.push({ id:0, url:img.dataUrl, name:img.file.name, size:img.file.size,delete:false })
        }).catch(this.$alert.error)

    },
    removeImage(idx){
      this.images[idx].delete = true;
    },
    save () {
      if (!this.payload && !this.imageMutate) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        var modify = Object.assign({ images:this.images }, this.payload)

        this.xsd.api.post('item/'+this.item.id, modify).then( data => {
          if(this.item.id == 0)
            this.callback('add', data.item);
          else
            this.callback('update', data.item);
        }).catch(this.$alert.error)

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

