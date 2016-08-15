export default {
  name: 'supplier',
  title: 'routes.supplier',
  hidden: __DEV__ ? 0 : 1,
  auth: 20,
  component: resolve => require(['views/supplier/index'], resolve),
  subRoutes: {
    '/items': {
      name: 'supplier/items',
      component: resolve => require(['views/supplier/items'], resolve)
    },
    '/businesses': {
      name: 'supplier/businesses',
      component: resolve => require(['views/supplier/businesses'], resolve)
    },
    '/user': {
      name: 'supplier/user',
      component: resolve => require(['views/supplier/user'], resolve)
    },
  }
}
