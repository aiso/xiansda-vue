
const defaultConfig = {
  auth: 20,
  navigator:true
}

export default {

  '/supplier/businesses': Object.assign({ }, defaultConfig, {
      title: 'supplier.routes.business',
    	name: 'supplier/businesses',
    	component: resolve => require(['views/supplier/businesses'], resolve)
    }),

  '/supplier/items': Object.assign({ }, defaultConfig, {
      title: 'supplier.routes.items',
    	name: 'supplier/items',
    	component: resolve => require(['views/supplier/items'], resolve)
    }),

  '/supplier/user': Object.assign({ }, defaultConfig, {
      title: 'supplier.routes.user',
    	name: 'supplier/user',
    	component: resolve => require(['views/supplier/user'], resolve)
    }),

  '/supplier/stations': Object.assign({ }, defaultConfig, {
      title: 'supplier.routes.stations',
    	name: 'supplier/stations',
    	component: resolve => require(['views/supplier/stations'], resolve)
    }),
  
}