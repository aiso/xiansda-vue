<template>
  <div>
	home 
  </div>
</template>

<script>
import store from 'store'

export default {
  route: {
    activate: transition => {
      if(!!store.getters.profile.station)
	      transition.next()
	  else
		transition.redirect('/client/station')
    }
  }
}
</script>