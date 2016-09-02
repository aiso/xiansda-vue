export default {
  routes: {
    '/': require('./home'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout'),
    '/demo': require('./demo'),
    '/docs': require('./docs'),

    //'/client': require('./client'),

    '/supplier': require('./supplier'),
    '/supplier/businesses': require('./supplier/businesses'),
    '/supplier/items': require('./supplier/items'),
    '/supplier/user': require('./supplier/user'),
    '/supplier/stations': require('./supplier/stations'),

    '/client/businesses': require('./client/businesses'),
    '/client/home': require('./client/home'),
    '/client/cart': require('./client/cart'),
    '/client/user': require('./client/user'),
    '/client/station': require('./client/station'),

  },

  alias: {
    // '/login/:username': '/login'
  }
}
