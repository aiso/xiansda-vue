<template>
  <div class='page-wrapper with-header'>
    <c-xsd-header :title="__('supplier.footer.item')">
      <div slot="leftButton">
        <a @click="callback('close')"><c-icon name="material-keyboard_backspace" class="block"></c-icon></a>
      </div>
      <div slot="rightButton">
        <a @click="menu.show=!menu.show" :class="{ 'active':menu.show }"><c-icon name="material-menu" class="block"></c-icon></a>
      </div>
    </c-xsd-header>
    <c-xsd-menu-h :menu="menu"></c-xsd-menu-h>
    <v-item v-if="item" :item='item'></v-item>
    <v-item-edit class='frame' v-if='edit' :callback="editCallback" transition="right-in"></v-item-edit>
  </div>
</template>

<script>
import { CPane, CButton, CIcon, CXsdHeader, CXsdMenuH } from 'components'
import { mapActions } from 'vuex'
import VItem from '../common/v-item'
import VItemEdit from './v-item-edit'
import ItemSupplierMixin from 'mixins/item-supplier'

export default {
  mixins: [ItemSupplierMixin],
  data () {
    return { 
      edit:false,
      menu: {
        show:false,
        items:[
          { title:'删除', icon:'material-delete_forever', click:this.removeItemL },
          { title:'编辑', icon:'material-edit', click:()=>{this.edit=true} }
        ]
      },

    }
  },
  props : {
    callback : {
      type : Function,
      default : () => true
    }
  },
    methods: {
    	...mapActions(['removeItem']),
      removeItemL () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.remove('item/'+this.item.id).then( () => {
            this.removeItem(this.item)
            this.callback('close')
          } ).catch(this.$alert.error)
        } )
      },
      editCallback () {


      }
    },
  components: {
    CPane,
    CButton,
    CIcon,
    CXsdHeader,
    VItem,
    VItemEdit,
    CXsdMenuH
  }
}
</script>