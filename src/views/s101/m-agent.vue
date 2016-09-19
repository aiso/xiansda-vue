<template>
  <c-modal :show.sync='show' :callback='modalAction' :actions="null">
    <div class="table-row p10">
      <div class="extend text-left">
        <h2>代理产品</h2>
      </div>
      <div>
        <a><c-icon name="material-delete_forever" class="block c-text-light"></c-icon></a>
      </div>
    </div>
    <c-validation
        :validation="$validation"></c-validation>
    <c-form
      :submit="login"
      :cells="cells"
      :items="items"
      @mutate="mutate">
    </c-form>
      <c-pane class="c-modal-footer">
        <c-cell direction="row">
          <c-flex>
            <c-submit class="primary" :submit="postAgent" :disabled="$validation && $validation.invalid" label="确定"></c-submit>
          </c-flex>
          <c-flex>
            <c-button class="default" @click="show=false">取消</c-button>
          </c-flex>
        </c-cell>
      </c-pane>
  </c-modal>
</template>

<script>
import { CValidation, CPane, CCell, CButton, CSubmit, CFlex, CModal, CPrice, CIcon, CXsdImage, CForm } from 'components'

import { mapActions, mapGetters } from 'vuex'

export default {
  props:{
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    item:{
      type: Object
    },
    agent:{
      type: Object,
      default: null
    }
  },
  computed:{
    ...mapGetters(['user']),
    items(){
      return Object.assign({
        strategy:1,
        fee:null,
        fee_min:null,
        fee_max:null
      }, this.agent)
    },
    cells(){
      const strategy = {
        label:'代理费率策略',
        type: 'CSelect',
        extra: {
          options:[
            { label:'按每笔费用', value:1 },
            { label:'按单价费用', value:2 },
            { label:'按总价比例', value:3 }
          ]
        },
        validate:{
          min:{
            rule: 1,
            message: '请指定代理费率策略'
          },
          max:{
            rule: 3,
            message: '请指定代理费率策略'
          }
        }
      }

      const labels = ['每单位费率', '每笔费率', '总价百分比']
      const units = ['元', '元', '%']
      const regex = [this.xsd.regex.price, this.xsd.regex.price, this.xsd.regex.percent]

      const fee = {
        label:labels[this.items.strategy-1],
        type: 'textfield',
        unit:units[this.items.strategy-1],
        attrs: {
          placeholder: '0.00'
        },
        validate:{
          required: {
            rule: true,
            message: '请指定代理费率'
          },
          pattern: {
            rule: regex[this.items.strategy-1],
            message: '代理费率输入错误'
          }
        }
      }

      const fee_min = {
        label:'最低代理费用下限',
        type: 'textfield',
        unit:'元',
        attrs: {
          placeholder: '0.00'
        },
        validate:{
          pattern: {
            rule: this.xsd.regex.price,
            message: '最低代理费用金额错误'
          }
        }
      }
      const fee_max = {
        label:'最高代理费用上限',
        type: 'textfield',
        unit:'元',
        attrs: {
          placeholder: '0.00'
        },
        validate:{
          pattern: {
            rule: this.xsd.regex.price,
            message: '最高代理费用金额错误'
          }
        }
      }

      return { strategy, fee, fee_min, fee_max  }
    }
  },
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    postAgent(){
      const service = this.xsd.service.get(this.item.service)
      this.xsd.api.post(service.surl('item/'+this.item.id+'/agent/'+this.user.id), this.payload).then(data=>{
        this.$emit('mutate', data)
        this.show = false
      })
    }
  },
  validator: {
    auto: true
  },
  components: {
    CValidation,
    CPane,
    CCell,
    CButton,
    CSubmit,
    CFlex,
    CModal,
    CPrice,
    CIcon,
    CXsdImage,
    CForm
  }
}
</script>


