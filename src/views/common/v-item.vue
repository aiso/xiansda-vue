<template>
  <div>
    <c-pane>
    	<h3>{{item.title}}</h3>
    </c-pane>
    <c-pane>
    	<p>{{item.content}}</p>
    </c-pane>
  </div>
</template>

<script>
import { CPane } from 'components'
export default {
  components: {
    CPane
  }
}
</script>
