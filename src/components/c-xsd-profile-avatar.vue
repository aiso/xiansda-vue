<template>
  <div v-if="profile">
    <c-xsd-avatar :src="profile.img" :size="size"></c-xsd-avatar>
  </div>
</template>

<script>
import CXsdAvatar from './c-xsd-avatar'

export default {
  props : {
    size: {
      type: String,
      default: 40
    },
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
  components:{
    CXsdAvatar
  }
}
</script>

