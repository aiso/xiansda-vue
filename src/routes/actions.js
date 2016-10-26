const defaultConfig = {
  	navigator:true,
}

export default {
	
  '/actions/10010':  Object.assign({ }, defaultConfig, {
  	auth: 10,
	title: '待付账单',
	name: 'actions/10010',
	component: resolve => require(['views/action/v-list-10010'], resolve)
  }),

  '/actions/10020':  Object.assign({ }, defaultConfig, {
  	auth: 30,
	title: '采购商品',
	name: 'actions/10020',
	component: resolve => require(['views/action/v-list-10020'], resolve)
  }),

  '/actions/10030':  Object.assign({ }, defaultConfig, {
  	auth: 30,
	title: '打包商品',
	name: 'actions/10030',
	component: resolve => require(['views/action/v-list-10030'], resolve)
  }),

}