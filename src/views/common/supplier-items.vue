<template>
  <div>
    <div class="p20 text-center" v-if="supplier">
      <c-xsd-avatar :src="supplier.img" class="ib"></c-xsd-avatar>
      <h3>{{supplier.name}}</h3>
    </div>
    <c-cell v-for="item in items" v-if="items" v-link="{ name:'item', params:{ id:item.id } }">
      <c-xsd-item :item='item'>
        <div slot="right">
            <c-icon name="material-chevron_right"></c-icon>
        </div>
      </c-xsd-item>      
    </c-cell>
  </div>
</template>

<script>
import { CFrame, CPane, CCell, CIcon, CXsdItem, CXsdAvatar } from 'components'
export default {
  data(){
    return {
      supplier:null,
      items:null,
    }
  },
  route: {
    data(transition){
      console.log(this.$route.params)
      this.xsd.api.getCache('supplier/'+this.$route.params.id+'/items').then(data=>{
        transition.next({
          supplier : data.supplier,
          items : data.items
        })
      })
    }
  },
  components: {
    CFrame,
    CPane,
    CCell,
    CIcon,
    CXsdItem,
    CXsdAvatar
  }
}
</script>

