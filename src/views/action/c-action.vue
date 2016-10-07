<template>
  <div class="c-action">
    <div class="flex-row">
      <div class="thumbnail">
        <c-xsd-avatar :src="action.user.img" size=40></c-xsd-avatar>
      </div>
      <div class="flex-auto pl15">
        <a class="text-ls">{{action.user.name}}</a>
        <h5 class="c-text-light">{{action.utime|timeago}}</h5>
      </div>
      <h4 class="text-ls c-text">{{config.name}}</h4>
      <c-icon :name="config.icon" class="block"></c-icon>
    </div>
    <component class="c-action-component" :is="'CAction'+this.action.action" :action="action" :user="user" :config="config"></component>

  </div>
</template>

<script>
import { CCell, CIcon, CXsdAvatar } from 'components'
import { mapGetters } from 'vuex'
import CAction10010 from './c-action-10010'
import CAction10020 from './c-action-10020'
import CAction20010 from './c-action-20010'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      config:this.xsd.action.get(this.action.action),
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  components:{
    CCell,
    CIcon,
    CXsdAvatar,
  	CAction10010,
    CAction10020,
  	CAction20010,
  }
}

</script>

<style>
  .c-action{
    border-top: 1px solid var(--border);
    padding:10px 0 10px 20px;
    
    &:first-child {
      border-top: none;
      border-radius: inherit;
    }
  }

  .c-action-component{
    padding:0 15px 0 55px;
  }

</style>