<template>
  <c-button v-if="!!action" @click="action.click" class="c-service-action primary">
    <c-icon :name="action.icon"></c-icon>
    <h5>{{action.title}}</h5>
  </c-button>
</template>

<script>
import { CButton, CIcon, CPrice } from 'components'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    item: {
      type: Object
    },
    user: {
      type: Object,
      default:null
    }
  },
  data(){
  	return{
  		service:this.xsd.service.get(this.item.service),
      action:null,
      station:null,
      agent:null
  	}
  },
  ready(){
    if(!this.user) return

    if(this.user.role == 30){
      this.xsd.api.get(this.service.surl('item/'+this.item.id+'/agent/'+this.user.id)).then(data=>{
        this.agent = data.agent
      })
    }else if(this.user.role == 10){
      this.xsd.api.get(this.service.surl('item/'+this.item.id+'/agent/'+this.user.station)).then(data=>{
        this.agent = data.agent
      })
    }



  },
  computed: {
    action(){
      if(!this.user) return null

      if(this.user.role == 30 && !this.agent){
        return {
          title:'我要代理',
          icon:'material-add',
          click:()=>{
            console.log('agent')
          }
        }
      }

      if(this.user.role == 30 && !!this.agent){

      }

    }
  },
  components:{
    CButton,
  	CIcon,
  	CPrice
  }
}
</script>

<style>
  .c-service-action.c-button{
    min-width: 4.2rem;
    display: inline-block;
    padding:0 .5rem;
  }
  .c-service-action .c-icon{
    margin-top: .5rem;
    font-size:32px;
    line-height:1;
  }

  .c-service-action h5{
    font-size: 10px;
    margin-top:-.6rem;
    line-height: 1;
    margin-bottom: .5rem
  }

</style>