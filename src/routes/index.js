const routes = {
    '/': require('./home'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout'),
    '/demo': require('./demo'),
    '/docs': require('./docs'),
}

Object.assign(routes, require('./supplier'))
Object.assign(routes, require('./client'))

Object.assign(routes, require('./s101'))

export default {
  routes,
  alias: {
    // '/login/:username': '/login'
  }
}
