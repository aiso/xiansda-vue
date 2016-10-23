<template>
  <div class="flex-row" v-if="!!profile">
    <c-xsd-avatar :src="profile.img" size=40></c-xsd-avatar>  
    <div class="flex-auto pl20">
      <h4 class="c-text text-ls">{{profile.name}}</h4>
      <h5 class="c-text-light  text-lh2">服务站：<c-xsd-profile-name :uid="profile.station"></c-xsd-profile-name></h5>
    </div>
    <div class="plr10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { CXsdAvatar, CXsdProfileName } from 'components'

export default {
  props : {
    uid : {
      type: Number
    },
    profile: {
      type: Object,
      default: null
    }
  },
  attached(){
    this.xsd.api.getCache('user/profile/'+this.uid).then(data=>{
      this.profile = data.profile
    })
  },
  components: {
    CXsdAvatar,
    CXsdProfileName
  }
}
</script>

