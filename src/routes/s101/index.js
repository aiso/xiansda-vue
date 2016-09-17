const defaultConfig = {
  	navigator:true,
}

export default {
	
  '/s101/item/:id/service':  Object.assign({ }, defaultConfig, {
  	auth: 20,
	title: '发布服务',
	name: 's101/item/service',
	component: resolve => require(['views/s101/item-service'], resolve)
  }),



}