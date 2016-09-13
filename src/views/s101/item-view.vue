<template>
  <div class='page-wrapper'>
    <div v-if="item">
      <v-item :item='item'></v-item>
      <c-pane>
        <p class="c-text-light">{{item.sItem.content}}</p>
      </c-pane>
    </div>

    <c-xsd-nav-button v-if="!!item && user.role==20" >
      <a class="icon" @click="deleteItem"><c-icon name="material-delete_forever" class="block"></c-icon></a>
      <a class="icon" v-link="{ name:'s101/item/edit', params:{ id:item.id } }"><c-icon name="material-edit" class="block"></c-icon></a>  
    </c-xsd-nav-button>

  </div>
</template>

<script>
import { CPane, CButton, CIcon,CListItem, CFrame, CXsdNavButton } from 'components'
import { mapActions, mapGetters } from 'vuex'
import VItem from '../common/v-item'


export default {
  data () {
    return { 
      edit:0,
      item:null
    }
  },
  route: {
    data(transition){
      this.xsd.api.getCache('s101/item/'+this.$route.params.id).then(data=>{
        transition.next({
          item:data.item
        })
      })
    },
    deactivate(transition){
      this.item = null
      transition.next()
    }
  },
  computed:{
    ...mapGetters(['user']),
  },
    methods: {
    	...mapActions(['removeItem', 'addItem', 'updateItem']),
      deleteItem () {
        this.$confirm.open('你确定要删除此产品？').then( () => {
          this.xsd.api.delete('s101/item/'+this.item.id).then( () => {
            this.removeItem(this.item.id)
            history.back()
          } )
        } )
      }
    },
  components: {
    CPane,
    CButton,
    CIcon,
    CListItem,
    VItem,
    CFrame,
    CXsdNavButton
  }
}
</script>