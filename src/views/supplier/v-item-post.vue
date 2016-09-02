<template>
  <div :class="['c-modal', class]" v-if="!!item" transition="fade">
    <c-mask v-if="backdrop" v-if="!!item"
      @touchend.prevent="itemid = 0"
      transition="fade"></c-mask>

    <div v-if="!!item" class="c-modal-content" transition="slide-up">
      <c-modal-header :image="item.img" title="发布产品" :sub-title="item.title"></c-modal-header>
      <div class="table-row p10">
        <div class="extend">
          <c-form
            :submit="post"
            :cells="cells"
            :items="fields"
            class="c-form-expand"
            @mutate="mutate">
          </c-form>
        </div>
        <div class="pl10">
          <c-button class="plr20" :class="action.class" @click="post"
              :disabled="action.disabled">{{action.label}}</c-button>
        </div>
        <div class="pl10" v-if="item.post">
          <c-button class="plr20 secondary" @click="offShelves">下架</c-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CMask, CValidation, CForm, CPane, CButton, CIcon, CModalHeader } from 'components'
import { mapActions } from 'vuex'
import ItemSupplierMixin from 'mixins/item-supplier'

export default {
  mixins: [ItemSupplierMixin],
  props : {
    itemid : {
      type : Number,
      twoWay: true,
      default : 0
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  computed:{
    item(){
      return this.itemid==0?null:this.getStoreItem(this.itemid)
    },
    fields(){
      return { 
        price: this.item.price.toFixed(2)
      }
    },
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
        label: this.progress ? '发布中...' : '发布',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },
  methods: {
    ...mapActions(['updateItem']),
    mutate ($payload) {
      this.payload = $payload
    },
    post(){
      if (!this.payload) {
        return
      }

      this.$validate().then(() => {
        const modify = { post:1, price:this.payload.price }
        this.xsd.api.post('item/'+this.item.id, modify).then(data=>{
          this.updateItem(Object.assign({ }, this.item, modify))
          this.itemid = 0;
        })

      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    },
    offShelves(){
      const modify = { post:0 }
      this.xsd.api.post('item/'+this.item.id, modify).then(data=>{
        this.updateItem(Object.assign({ }, this.item, modify))
        this.itemid = 0;
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
    CButton,
    CIcon,
    CModalHeader
  }
}
</script>

<style src="styles/components/modal"></style>

