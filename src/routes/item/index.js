const defaultConfig = {
  	navigator:true,
}

export default {
	
  '/item/new': Object.assign({ }, defaultConfig, {
  	auth: 20,
	title: 'item.new',
	name: 'item/new',
	component: resolve => require(['views/item/edit'], resolve)
  }),

  '/item/:id/edit': Object.assign({ }, defaultConfig, {
  	auth: 20,
	title: 'item.edit',
	name: 'item/edit',
	component: resolve => require(['views/item/edit'], resolve)
  }),

}