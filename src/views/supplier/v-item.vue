<template>
  <div class='page-wrapper'>
    <c-xsd-navbar :title="__('supplier.footer.item')" type="frame">
      <div slot="left">
        <a @click="callback('close')"><c-icon name="material-keyboard_backspace" class="block"></c-icon></a>
      </div>
      <div slot="right">
        <a @click="menu.show=!menu.show" :class="{ 'active':menu.show }"><c-icon name="material-menu" class="block"></c-icon></a>
      </div>
    </c-xsd-navbar>

    <c-xsd-menu-h :menu="menu"></c-xsd-menu-h>
    <v-item v-if="item" :item='item'></v-item>

    <c-frame :toggle='edit'>
      <v-item-edit v-if="item" :callback="editCallback" :item-id='item.id'></v-item-edit> 
    </c-frame>
  </div>
</template>

<script>
import { CPane, CButton, CIcon, CXsdMenuH, CFrame, CXsdNavbar } from 'components'
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
          { title:'编辑', icon:'material-edit', click:()=>{ this.edit=true;this.menu.show=false } }
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
    	...mapActions(['removeItem', 'addItem', 'updateItem']),
      removeItemL () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.remove('item/'+this.item.id).then( () => {
            this.removeItem(this.item)
            this.callback('close')
          } ).catch(this.$alert.error)
        } )
      },
      editCallback (event, data) {
        this.edit = false;
        if(event == 'add')
          this.addItem(data);
        else if(event == 'update'){
          this.updateItem(data);
        }
      }
    },
  components: {
    CPane,
    CButton,
    CIcon,
    VItem,
    VItemEdit,
    CXsdMenuH,
    CFrame,
    CXsdNavbar
  }
}
</script>