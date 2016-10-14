const defaultConfig = {
  	auth: 10,
  	navigator:true,
}

export default {

  '/client/trans': Object.assign({ }, defaultConfig, {
		title: 'client.routes.trans',
	  	name: 'client/trans',
	  	component: resolve => require(['views/client/trans'], resolve)
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

  '/client/payment': Object.assign({ }, defaultConfig, {
		title: 'client.routes.payment',
		name: 'client/payment',
		component: resolve => require(['views/client/payment'], resolve)
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