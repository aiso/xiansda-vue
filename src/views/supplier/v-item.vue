<template>
  <div class='page-wrapper'>

    <v-item v-if="item" :item='item'></v-item>
    <c-frame :toggle.sync='edit' :title="__('supplier.item.edit')">
      <v-item-edit :callback="editCallback" :item='item'></v-item-edit> 
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
      edit:0,
      item:null
    }
  },
  props : {
    itemid: {
      type: Number,
      twoWay: true
    },
    callback : {
      type : Function,
      default : () => true
    }
  },
  ready(){
    this.getSupplierItem(this.itemid).then(item=>{
      this.item=item;
      this.$navbar.navigator.navOptions = [
        { icon:'material-delete_forever', click:this.removeItemL },
        { icon:'material-edit', click:()=>{ this.edit=this.item.id } }
      ]
    })
  },
    methods: {
    	...mapActions(['removeItem', 'addItem', 'updateItem']),
      removeItemL () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.delete('item/'+this.item.id).then( () => {
            this.removeItem(this.item.id)
            this.itemid=0
          } )
        } )
      },
      editCallback (event, item) {
        this.edit = 0;
        if(event == 'add')
          this.addItem(item);
        else if(event == 'update'){
          this.updateItem(item)
          this.item = item
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