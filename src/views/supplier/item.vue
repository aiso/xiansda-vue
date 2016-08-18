<template>
  <div class='page-wrapper with-header'>
    <c-xsd-header :title="__('supplier.footer.item')">
      <div slot="leftButton">
        <a @click="callback('close')"><c-icon name="material-keyboard_backspace" class="block"></c-icon></a>
      </div>
      <div slot="rightButton">
        <a @click="removeItem" class="warning"><c-icon name="material-delete_forever" class="block"></c-icon></a>
      </div>
    </c-xsd-header>
    <div class="table-row">
      <div>
        
      </div>
    </div>
    <v-item v-if="sitem" :item='sitem'></v-item>
  </div>
</template>

<script>
import { CPane, CButton, CIcon, CXsdHeader } from 'components'
import { mapActions } from 'vuex'
import VItem from '../common/v-item'

export default {
  props : {
    item : {
      type : Object,
      default : null
    },
    callback : {
      type : Function,
      default : () => true
    }
  },
	data () {
		return { sitem: null }
	},
	activate (done) {
		if(!!this.item.supplierView){
			this.sitem = this.item;
			done();
		}else{
			this.xsd.api.get('item/'+this.item.id).then( data => {
				data.item.supplierView = true;
				this.updateItem(data.item);
				this.sitem = data.item;
				done();
			} ).catch(this.$alert.error)
		}
	},
    methods: {
    	...mapActions(['updateItem', 'removeItem']),
      removeItem () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.remove('item/'+this.sitem.id).then( () => {
            this.removeItem(this.sitem)
            this.callback('close')
          } ).catch(this.$alert.error)
        } )
      }
    },
  components: {
    CPane,
    CButton,
    CIcon,
    CXsdHeader,
    VItem,
  }
}
</script>