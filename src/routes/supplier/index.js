export default {

  '/supplier/businesses': {
    title: 'supplier.routes.business',
  	auth: 20,
  	navigator:true,
  	name: 'supplier/businesses',
  	component: resolve => require(['views/supplier/businesses'], resolve)
  },

  '/supplier/items': {
    title: 'supplier.routes.items',
  	auth: 20,
  	navigator:true,
  	name: 'supplier/items',
  	component: resolve => require(['views/supplier/items'], resolve)
  },

  '/supplier/user': {
	title: 'supplier.routes.user',
  	auth: 20,
  	navigator:true,
  	name: 'supplier/user',
  	component: resolve => require(['views/supplier/user'], resolve)
  },

  '/supplier/stations': {
	title: 'supplier.routes.stations',
  	auth: 20,
  	navigator:true,
  	name: 'supplier/stations',
  	component: resolve => require(['views/supplier/stations'], resolve)
  },
  
}