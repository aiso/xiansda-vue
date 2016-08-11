<template>
  <div class="demos">
    <c-pane>
      <c-form
        :cells="cells"
        :items="{lang: lang}"
        @mutate="setEnv"></c-form>
    </c-pane>
    <c-pane class="quatation">
      {{ __('view.message', [hello]) }}
    </c-pane>
    <c-pane>
      <c-cell transition="fade">
        <c-button class="primary fit small" v-link="'/demo'">demo</c-button>
        <c-button class="primary fit small" v-link="'/login'">login</c-button>
        <c-button class="primary fit small" v-link="'/logout'">logout</c-button>
      </c-cell>
    </c-pane>

  </div>
</template>

<script>
import datetime from 'nd-datetime'
import { CForm, CPane, CGroup, CTitle, CLoading, CImage, CCell, CButton } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      ua: navigator.userAgent,
      hello: 'Redx'
    }
  },

  computed: {
    ...mapGetters(['lang']),
    cells () {
      return {
        lang: {
          label: this.__('view.home.language'),
          type: 'CSelect',
          extra: {
            options: [{
              value: 'en',
              label: 'English'
            }, {
              value: 'zh',
              label: '中文'
            }, {
              value: 'none',
              label: '不存在的语言'
            }]
          }
        }
      }
    }
  },

  methods: mapActions(['setEnv']),

  ready () {
    //this.getCommits()
  },

  filters: {
    datetime
  },

  components: {
    CForm,
    CPane,
    CGroup,
    CTitle,
    CLoading,
    CCell,
    CImage,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
