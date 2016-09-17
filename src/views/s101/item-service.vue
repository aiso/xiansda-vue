<template>
  <div class='page-wrapper'>
    <div v-if="item">
      <div class="p20 border-bottom">
        <c-xsd-item :item='item'></c-xsd-item>
      </div>
      <c-pane class="text-center">
        <div class="p20">
          <c-icon :name="service.config.icon" class="big c-text-light"></c-icon>
          <h3>{{service.config.title}}</h3>
        </div>
        <div class="p20">
          <input v-model="price" class="input-simple bg-gray-light full-width p10 text-center" placeholder="商品价格">
          <c-button @click="postService" class="primary mt20" :disabled="!validator">发布</c-button>
        </div>
      </c-pane>
    </div>
  </div>
</template>

<script>
import { CPane, CButton, CIcon,CXsdItem, CFrame } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return { 
      price:''
    }
  },
  route: {
    data(transition){
      if(this.item.service > 0)
        transition.next({
          price: this.item.params.price
        })
      else
        transition.next({
          price:''
        })
    },
    activate(transition){
      if(this.item.service > 0){
        this.$root.setNavOptions([{
            icon:'material-delete_forever',
            click: ()=>{ 
              this.$confirm.open('停止发布服务？').then(()=>{
                this.xsd.api.delete(this.service.surl('item/'+this.$route.params.id+'/service')).then(data=>{
                  this.updateItem(data.item)
                  history.back()
                })
              })
            }
          }])
      }
      transition.next()
    }
  },
  computed:{
    ...mapGetters(['items']),
    item (){
      return this.items.find(i=>i.id==this.$route.params.id)
    },
    service() {
      return this.xsd.service.get(101)
    },
    validator(){
      return this.xsd.regex.price.test(this.price)
    }
  },
  methods: {
    ...mapActions(['updateItem']),
    postService(){
      this.xsd.api.post(this.service.surl('item/'+this.$route.params.id+'/service'), { price:this.price }).then(data=>{
          this.updateItem(data.item)
          history.back()
      })
    }
  },
  components: {
    CPane,
    CButton,
    CIcon,
    CXsdItem,
    CFrame,
  }
}
</script>