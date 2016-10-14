export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default:null
    },
    agent: {
      type: Object,
      default:null
    }
  }
}