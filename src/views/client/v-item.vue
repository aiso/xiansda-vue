<template>
  <div class='page-wrapper'>
    <v-item v-if="item" :item='item'></v-item>
    <div slot="options">
      <div v-for="option in navOptions">
        <a @click="option.click"><c-icon :name="option.icon" class="block"></c-icon></a>  
      </div>
    </div>
    <c-xsd-nav-button>
      <a class="icon" @click="test"><c-icon name="material-edit" class="block"></c-icon></a>  
    </c-xsd-nav-button>
  </div>
</template>

<script>
import { CPane, CButton, CIcon,CListItem, CFrame, CXsdNavButton } from 'components'
import { mapActions } from 'vuex'
import VItem from '../common/v-item'

export default {
  data () {
    return { 
      item:null
    }
  },
  props : {
    itemid: {
      type: Number,
      twoWay: true
    }
  },
  ready(){
    this.xsd.api.getCache('item/'+this.itemid+'?with=images').then(data=>{
      this.item = data.item
    })

  },
  methods: {
    test(){
      console.log('test')
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