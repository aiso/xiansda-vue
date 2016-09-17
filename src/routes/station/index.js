
const defaultConfig = {
  auth: 30,
  navigator:true
}

export default {

  '/station/businesses': Object.assign({ }, defaultConfig, {
      title: 'station.routes.business',
    	name: 'station/businesses',
    	component: resolve => require(['views/station/businesses'], resolve)
    }),

  '/station/agents': Object.assign({ }, defaultConfig, {
      title: 'station.routes.agents',
    	name: 'station/agents',
    	component: resolve => require(['views/station/agents'], resolve)
    }),

  '/station/user': Object.assign({ }, defaultConfig, {
      title: 'station.routes.user',
      name: 'station/user',
      component: resolve => require(['views/station/user'], resolve)
    }),

  
}