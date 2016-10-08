
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

  '/station/user': Object.assign({ }, defaultConfig, {
      title: 'station.routes.user',
      name: 'station/user',
      component: resolve => require(['views/station/user'], resolve)
    }),

  '/station/action/10020': Object.assign({ }, defaultConfig, {
      title: 'station.routes.action.10020',
      name: 'station/action/10020',
      component: resolve => require(['views/station/action-10020'], resolve)
    }),


}