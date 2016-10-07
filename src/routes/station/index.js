
const defaultConfig = {
  auth: 30,
  navigator:true
}

export default {

  '/station/trans': Object.assign({ }, defaultConfig, {
      title: 'station.routes.trans',
    	name: 'station/trans',
    	component: resolve => require(['views/station/trans'], resolve)
    }),

  '/station/agents': Object.assign({ }, defaultConfig, {
      title: 'station.routes.agents',
    	name: 'station/agents',
    	component: resolve => require(['views/station/agents'], resolve)
    }),

  '/station/packages': Object.assign({ }, defaultConfig, {
      title: 'station.routes.packages',
      name: 'station/packages',
      component: resolve => require(['views/station/packages'], resolve)
    }),

  '/station/user': Object.assign({ }, defaultConfig, {
      title: 'station.routes.user',
      name: 'station/user',
      component: resolve => require(['views/station/user'], resolve)
    }),

  
}