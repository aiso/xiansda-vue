<template>
  <div class="flex-row">
    <h4 class="flex-auto">{{config.name}}</h4>
    <a :class="statement.class" @click="onAction">{{statement.text}}</a>
  </div>
</template>

<script>
import actionMixin from './action-mixin'

export default {
  mixins: [actionMixin],
  computed: {
    statement(){
      if(this.user.role == this.xsd.static.role.client)
        return (this.action.stat == 0)?{ text:'待处理',class:'c-text-light' }:{ text:'已完成',class:'c-green' }
      else if(this.user.role == this.xsd.static.role.station)
        return (this.action.stat == 0)?{ text:'点击处理',class:'c-blue' }:{ text:'已完成',class:'c-green' }
    }
  },
  methods: {
    onAction(){

    }
  }
}

</script>