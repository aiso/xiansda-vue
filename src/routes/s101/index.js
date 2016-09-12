const defaultConfig = {
  	navigator:true,
}

export default {
	
  '/s101/item/edit':  Object.assign({ }, defaultConfig, {
  	auth: 20,
	title: '产品',
	name: 's101/item/edit',
	component: resolve => require(['views/s101/item-edit'], resolve)
  })

}