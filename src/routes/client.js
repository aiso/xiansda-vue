export default {
  name: 'client',
  title: 'routes.client',
  hidden: __DEV__ ? 0 : 1,
  auth: 10,
  component: resolve => require(['views/client/index'], resolve),
  subRoutes: {
    '/home': {
      name: 'client/home',
      component: resolve => require(['views/client/home'], resolve)
    },
    '/cart': {
      name: 'client/cart',
      component: resolve => require(['views/client/cart'], resolve)
    },
    '/business': {
      name: 'client/business',
      component: resolve => require(['views/client/business'], resolve)
    },
    '/user': {
      name: 'client/user',
      component: resolve => require(['views/client/user'], resolve)
    },
  }
}
