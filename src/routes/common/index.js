const defaultConfig = {
  	navigator:true,
}

export default {
	
  '/common/supplier/:id/items': Object.assign({ }, defaultConfig, {
	title: '供应商产品',
	name: 'common/supplier/items',
	component: resolve => require(['views/common/supplier-items'], resolve)
  }),



}