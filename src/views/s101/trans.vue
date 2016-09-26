<template>
  <div class='page-wrapper'>
    <div v-if="trans">

      <c-xsd-nav-button>
        <a class="icon">
            <c-icon name="material-refresh" class="block"></c-icon>
        </a>
      </c-xsd-nav-button>

    </div>
  </div>
</template>

<script>
import { CPane, CButton, CIcon, CXsdNavButton } from 'components'

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
    CXsdNavButton,
  }
}
</script>
