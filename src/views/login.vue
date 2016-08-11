<template>
  <div class="v-login">
    <c-pane>
      <c-validation
        :validation="$validation"></c-validation>
      <c-form
        :submit="login"
        :cells="cells"
        :items="items"
        @mutate="mutate">
        <c-pane dir="vertical" slot="footer">
          <c-button :class="action.class"
            :type="action.type"
            :disabled="action.disabled">{{action.label}}</c-button>
        </c-pane>
      </c-form>
    </c-pane>

    <h3>{{auth||'no user'}}</h3><a @click="test">test auth</a>
  </div>
</template>

<script>
import { CValidation, CPane, CForm, CButton } from 'components'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      items: {
        username: this.$route.query.username,
        password: ''
      }
    }
  },

  computed: {
    ...mapGetters(['authorized', 'auth']),
    cells () {
      return {
        username: {
          label: '账号',
          icon: 'user',
          type: 'textfield',
          attrs: {
            placeholder: '只能包含小写英文字母'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入账号'
            },
            minlength: {
              rule: 4,
              message: '账号不能少于 4 个字符'
            },
            maxlength: {
              rule: 20,
              message: '账号不能多于 20 个字符'
            },
            pattern: {
              rule: '/^[a-z]{4,20}$/',
              message: '账号不符合规则'
            }
          }
        },
        password: {
          label: '密码',
          icon: 'check',
          type: 'password',
          attrs: {
            placeholder: '字母、数字或标点符号'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入密码'
            },
            minlength: {
              rule: 8,
              message: '密码不能少于 8 个字符'
            },
            maxlength: {
              rule: 20,
              message: '密码不能多于 20 个字符'
            },
            pattern: {
              rule: '/^[`~!@#$%^&*_+=,.;\'?:"()<>{}\\-\\/\\[\\]\\\\ 0-9a-zA-Z]{8,20}$/',
              message: '密码不符合规则'
            }
          }
        }
      }
    },
    action () {
      return {
        type: 'submit',
        class: 'primary',
        label: this.progress ? '提交登录中...' : '提交登录',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },

  // methods
  methods: {
    ...mapActions(['setEnv', 'setAuth']),
    mutate ($payload) {
      this.payload = $payload
    },
    login () {
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        this.setEnv({
          authorized: true
        })
      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    },
    test () {
      //this.setAuth({ a:'1', b:'2' })
      this.xapi.get('test').then(data=>{console.log(data)})
    }
  },

  validator: {
    auto: true
  },

  route: {
    activate (transition) {
      transition.next()
      this.authorized && this.$route.router.go('/')
    }
  },

  watch: {
    authorized (val) {
      if (val) {
        this.$nextTick(() => {
          this.$route.router.go('/logout')
        })
      }
    }
  },

  components: {
    CValidation,
    CPane,
    CForm,
    CButton
  }
}
</script>

<style src="styles/views/login"></style>
