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


}