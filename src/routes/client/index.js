const defaultConfig = {
  	auth: 10,
  	navigator:true,
}

export default {
	
  '/client/businesses': Object.assign({ }, defaultConfig, {
		title: 'client.routes.business',
	  	name: 'client/businesses',
	  	component: resolve => require(['views/client/businesses'], resolve)
	}),

  '/client/home': Object.assign({ }, defaultConfig, {
		title: 'client.routes.home',
		name: 'client/home',
		component: resolve => require(['views/client/home'], resolve)
	}),

  '/client/cart': Object.assign({ }, defaultConfig, {
		title: 'client.routes.cart',
		name: 'client/cart',
		component: resolve => require(['views/client/cart'], resolve)
	}),

  '/client/user': Object.assign({ }, defaultConfig, {
		title: 'client.routes.user',
		name: 'client/user',
		component: resolve => require(['views/client/user'], resolve)
	}),

  '/client/station': Object.assign({ }, defaultConfig, {
		title: 'client.routes.station',
		name: 'client/station',
		component: resolve => require(['views/client/station'], resolve)
	}),

}