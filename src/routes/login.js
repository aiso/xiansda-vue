export default {
  icon: 'login',
  title: 'routes.login',
  name: 'login',
  navigator:false,
  auth: false,
  component: resolve => require(['views/login'], resolve)
}
