<template>
  <div class="table-row">
    <div>
      <c-icon :name="cfg.icon" class="block"></c-icon>
    </div>
    <div class="extend plr20" v-if="action.stat == 0">
      <a>{{action.content}}</a>
      <h5>未付账单</h5>
    </div>
  </div>
</template>

<script>
import { CIcon } from 'components'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      cfg:this.xsd.action.get(this.action.action),
    }
  },
  computed: {

  },
  components:{
  	CIcon,
  }
}

</script>