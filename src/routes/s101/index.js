export default {
	
  '/s101/item/edit': {
	title: 's101.item.edit',
	auth: 20,
	navigator:true,
	name: 's101/item/edit',
	component: resolve => require(['views/s101/item-edit'], resolve)
  }

}