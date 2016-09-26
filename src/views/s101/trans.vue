<template>
  <div class='page-wrapper'>
    <div v-if="trans">
      <div class="table-row p15 border-bottom">
        <div class="valign-top">
          <c-xsd-image :src="trans.item.img" class="image-square"></c-xsd-image>
        </div>
        <div class="extend plr10">
          <a>{{trans.item.title}}</a>
          <h5 class="c-text-light mt5">下单：{{trans.ctime}}</h5>
        </div>
        <div class="nowrap">
          <h3>x{{trans.sadd.quantity}}</h3>
        </div>
      </div>

      <c-xsd-nav-button>
        <a class="icon">
            <c-icon name="material-refresh" class="block"></c-icon>
        </a>
      </c-xsd-nav-button>

    </div>
  </div>
</template>

<script>
import { CPane, CButton, CIcon, CXsdImage, CXsdNavButton } from 'components'

export default {
  data(){
    return {
      trans:null
    }
  },
  route: {
    data(transition){
      this.xsd.api.getCache(this.xsd.service.get(101).surl('trans/'+this.$route.params.id)).then(data=>{
        transition.next({
          trans:data.trans
        })
      })
    }
  },
  components: {
    CPane,
    CButton,
    CIcon,
    CXsdImage,
    CXsdNavButton,
  }
}
</script>
