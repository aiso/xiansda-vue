export default {
  name: 'supplier',
  title: 'routes.supplier',
  hidden: __DEV__ ? 0 : 1,
  component: resolve => require(['views/supplier/index'], resolve),
  subRoutes: {
    '/home': {
      name: 'supplier/home',
      component: resolve => require(['views/supplier/home'], resolve)
    },
    '/business': {
      name: 'supplier/business',
      component: resolve => require(['views/supplier/business'], resolve)
    },
    '/user': {
      name: 'supplier/user',
      component: resolve => require(['views/supplier/user'], resolve)
    },
  }
}
