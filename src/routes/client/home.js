export default {
  title: 'client.routes.home',
  auth: 10,
  navigator:true,
  name: 'client/home',
  component: resolve => require(['views/client/home'], resolve)
}
