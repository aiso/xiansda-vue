<template>
  <span v-if="profile" :class="[class]">{{profile.name}}</span>
</template>

<script>

export default {
  props : {
    class: {
      type: String,
      default: ''
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
  }
}
</script>

