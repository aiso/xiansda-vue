export default {
  routes: {
    '/': require('./home'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout'),
    '/demo': require('./demo'),
    '/docs': require('./docs'),

    '/client': require('./client'),
    '/supplier': require('./supplier')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
