<template>
  <div>
    <c-pane v-if="$route.path === '/demo'">
      <c-group v-for="demo in demos" :title="__(demo.title)" :cells="demo.cells" :items="demo.items"></c-group>
      <c-cell>
        <c-button class='primary fit small' @click='test'>test</c-button>
        <c-button class='primary fit small' @click='alertTest' >alert</c-button>
        <c-button class='primary fit small' @click='confirmTest' >confirm</c-button>
        <c-button class='primary fit small' @click='frameTest' >frame</c-button>
        <c-button class='primary fit small' @click='promiseTest' >promise</c-button>
      </c-cell>
    </c-pane>

    <!--c-frame :show.sync='frame' title="test frame">
      <frame-test></frame-test>
    </c-frame-->
    <frame-test class='frame' v-if='frame' :callback="frameCallback" transition="right-in"></frame-test>

    <c-toolbar title="测试模块"></c-toolbar>
    <router-view class="router-view" transition="slide-up" keep-alive></router-view>
  </div>
</template>

<script>
  import Promise from 'nd-promise'
  import { CPane, CGroup, CTitle, CCell, CButton, CToolbar, CFrame } from 'components'
  import FrameTest from './frame'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return { frame:false }
    },
    computed: {
      demos () {
        const { router } = this.$route
        return [{
          title: 'view.home.example',
          cells: [{
            label: 'form',
            value: this.__('demo.form'),
            click () {
              router.go('/demo/form')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'swipe',
            value: this.__('demo.swipe'),
            click () {
              router.go('/demo/swipe')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'iscroll',
            value: this.__('demo.iscroll'),
            click () {
              router.go('/demo/iscroll')
            },
            extra: {
              isLink: true
            }
          }]
        }]
      }
    },
    methods: {
      ...mapActions(['addToast']),
      test () {
        this.xsd.api.get('test').then(data=>{this.$modal.alert.open(data)}).catch( data => { this.$modal.alert.open(data)} )
        //this.xsd.nav.home();
      },
      alertTest () {
        this.$alert.open('aa');
      },
      confirmTest () {
        this.$confirm.open('确认测试？').then( ()=>{console.log('confirm')} ).catch( ()=>{console.log('cancel')} );
      },
      frameTest () {
        this.frame = true;
      },
      frameCallback (event, data) {
        if(event === 'close')
          this.frame = false;
        else{
          this.frame = false;
          console.log(event);
          console.log(data);
        }
      },
      promiseTest() {
        var a = 1;
        /*
        var promise = new Promise((resolve, reject) => {
          resolve(++a);
        })
        */
        var promise = Promise.resolve(a)

        promise.then( v=>v+1 ).then( v=>{
          return Promise.reject(6)
        } ).catch( v=>{ console.log('catch '+v);return Promise.reject(0) } ).then( v=>{ console.log(v) } );
      }
    },
    components: {
      CPane,
      CGroup,
      CTitle,
      CCell,
      CToolbar,
      CButton,
      CFrame,
      FrameTest
    }
}
</script>