<template>
  <div v-if="profile" class="flex-row">
    <h5 class="c-text-light">{{style.label}}</h5>
    <h5 class="flex-auto" :class="style.class">{{profile.name}}</h5>
  </div>
</template>

<script>
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
  computed: {
    style(){
      if(this.profile.role == '20')
        return { label:'供应商：', class:'c-orange' }
      else
        return { label:'', class:'' }
    }
  }
}
</script>

