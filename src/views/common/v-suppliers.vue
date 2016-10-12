<template>
  <c-frame :toggle.sync="toggle" title="选择供应商">
    <div class="p20">
      <h3 class="p10">供应商</h3>
      <c-cell v-for="item in items" @click="onSelect(item.id)" class="padding-tb">
        <c-xsd-item :item='item'>
          <div slot="detail">
            <h5 class="c-text-light mt5">{{item.address}}</h5>
          </div>
          <div slot="right">
              <c-icon name="material-chevron_right"></c-icon>
          </div>
        </c-xsd-item>      
      </c-cell>
    </div> 
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
  methods: {
    onSelect(id){
      this.$emit('callback', id)
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

