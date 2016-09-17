<template>
  <c-frame :toggle.sync="toggle" title="选择供应商">

      <c-cell v-for="item in items" v-link="{ name:'common/supplier/items', params:{ id:item.id } }">
        <c-xsd-item :item='item'>
          <div slot="subTitle">
            <h5>{{item.address}}</h5>
          </div>
          <div slot="right">
              <c-icon name="material-chevron_right"></c-icon>
          </div>
        </c-xsd-item>      
      </c-cell>

  </c-frame>
</template>

<script>
import { CFrame, CPane, CCell, CIcon, CXsdItem } from 'components'
export default {
  props : {
    toggle:{
      type:Number,
      twoWay:true
    },
    callback: {
      type: Function
    }
  },
  data(){
    return {
      suppliers:null
    }
  },
  computed: {
    items(){
      if(!this.suppliers) return []

      return this.suppliers.map(supplier=>{
        return {
          id:supplier.id,
          avatar:supplier.img,
          title:supplier.name,
          address:supplier.address
        }
      })
    }
  },
  watch: {
    toggle(v){
      if(!!v === true && this.suppliers == null){
        this.xsd.api.getCache('region/1/suppliers').then(data=>{
          this.suppliers = data.suppliers
        })
      }
    }
  },
  components: {
    CFrame,
    CPane,
    CCell,
    CIcon,
    CXsdItem
  }
}
</script>

