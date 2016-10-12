<template>
  <div>
    <div class="flex-row p10 bg-gray-light border-bottom">
      <c-icon name="material-local_offer" class="block"></c-icon>
      <div class="flex-auto plr10">
        <c-price :amount="activityItem.price" ></c-price>
      </div>
      <div>
        <h5 class="c-text-light">售价</h5>
      </div>
    </div>
  	<c-item-view :item="activityItem"></c-item-view>
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
import { CIcon, CPrice, CXsdNavButton } from 'components'
import { mapGetters } from 'vuex'
import CItemView from '../item/c-view'

export default {
  computed: {
    ...mapGetters(['activityItem']),
  },
  methods: {
    mutate (event) {
      this.$emit('mutate', event, this.activityItem.id)
    },
  },
  components: {
  	CIcon,
    CPrice,
    CItemView,
    CXsdNavButton
  }
}
</script>