export default {
  title: 'client.routes.user',
  auth: 10,
  navigator:true,
  name: 'client/user',
  component: resolve => require(['views/client/user'], resolve)
}
