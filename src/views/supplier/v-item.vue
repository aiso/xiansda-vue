<template>
  <div class='page-wrapper'>

    <v-item v-if="item" :item='item'></v-item>
    <c-frame :toggle.sync='edit'>
      <v-item-edit v-if="item" :callback="editCallback" :itemid='item.id'></v-item-edit> 
    </c-frame>
  </div>
</template>

<script>
import { CPane, CButton, CIcon,CListItem, CFrame, CXsdNavbar } from 'components'
import { mapActions } from 'vuex'
import VItem from '../common/v-item'
import VItemEdit from './v-item-edit'
import ItemSupplierMixin from 'mixins/item-supplier'

export default {
  mixins: [ItemSupplierMixin],
  data () {
    return { 
      edit:false,
    }
  },
  props : {
    callback : {
      type : Function,
      default : () => true
    }
  },
  ready(){
    this.$navbar.setNavOptions([
      { icon:'material-delete_forever', click:this.removeItemL },
      { icon:'material-edit', click:()=>{ this.edit=true;this.menu.show=false } }
    ])
  },
    methods: {
    	...mapActions(['removeItem', 'addItem', 'updateItem']),
      removeItemL () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.delete('item/'+this.item.id).then( () => {
            this.removeItem(this.stopGetItem())
            this.callback('close')
          } )
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
    CListItem,
    VItem,
    VItemEdit,
    CFrame,
    CXsdNavbar
  }
}
</script>