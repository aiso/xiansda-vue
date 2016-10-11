<template>
  <div>
  	<c-item-view :item="item"></c-item-view>

	  <c-xsd-nav-button>
	    <a class="icon" @click="mutate('delete')">
	        <c-icon name="material-delete_forever" class="block"></c-icon>
	    </a>
	    <a class="icon" @click="mutate('edit')">
	        <c-icon name="material-edit" class="block"></c-icon>
	    </a>
	  </c-xsd-nav-button>

  </div>
</template>


<script>
import { CIcon, CXsdNavButton } from 'components'
import CItemView from '../item/c-view'

export default {
  props: {
  	itemId:{
	  type: Number
  	}
  },
  data(){
  	return {
  		item:{ }
  	}
  },
  attached () {
      this.xsd.item.get(this.itemId).then(item=>{
      	this.item = item
      })
  },
  methods: {
    mutate (event) {
      this.$emit('mutate', event, this.itemId)
    },
  },
  components: {
  	CIcon,
	CItemView,
	CXsdNavButton
  }
}
</script>