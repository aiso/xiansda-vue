export default {
	
  '/client/businesses': {
  	title: 'client.routes.business',
  	auth: 10,
  	navigator:true,
  	name: 'client/businesses',
  	component: resolve => require(['views/client/businesses'], resolve)
  },

  '/client/home': {
	title: 'client.routes.home',
	auth: 10,
	navigator:true,
	name: 'client/home',
	component: resolve => require(['views/client/home'], resolve)
  },

  '/client/cart': {
	title: 'client.routes.cart',
	auth: 10,
	navigator:true,
	name: 'client/cart',
	component: resolve => require(['views/client/cart'], resolve)
  },

  '/client/user': {
	title: 'client.routes.user',
	auth: 10,
	navigator:true,
	name: 'client/user',
	component: resolve => require(['views/client/user'], resolve)
  },

  '/client/station': {
	title: 'client.routes.station',
	auth: 10,
	navigator:true,
	name: 'client/station',
	component: resolve => require(['views/client/station'], resolve)
  },

}