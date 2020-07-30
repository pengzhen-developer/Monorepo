/**
 * Create vue app instance
 * router & store
 *
 */

import Vue from 'vue'
import App from '@src/App.vue'

import CreateRouter from '@src/router'
import CreateStore from '@src/store'
import Peace from '@src/library'

const getConfiguration = (params) => {
  const url = process.env.VUE_APP_BASE_API + '/console/Service/getServiceSettingMenu'
  return Peace.http.post(url, params)
}
/**
 * Create Vue App
 *
 * @export { app, router, store}
 * @returns
 */
export default async function(configuration) {
  const serviceId = Peace.cache.localStorage.get('serviceId')
  const params = { serviceId }
  if (serviceId) {
    Peace.cache.localStorage.remove('serviceId')

    const configurationByService = await getConfiguration(params)

    const reg = /[^{}]*{(.*)}[^}]*/
    configurationByService.data.menuArr.map((value) => {
      console.log(value)
      const route = value.menuPath && value.menuPath.replace(reg, '$1')
      value.menuPath = value.menuPath && value.menuPath.replace('{' + route + '}', '')
      value.menuPath = value.menuPath && route && process.env[route] + value.menuPath
      console.log(value)
    })
    configuration.routes.layoutNavMenu = configurationByService.data.menuArr
  }

  // Create store and router instances
  const store = await CreateStore({ Vue, configuration })
  const router = await CreateRouter({ Vue, store, configuration })

  // Make router instance available in store
  store.$router = router

  // Create the app instantiation Object.
  // Here we inject the router, store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.

  const app = {
    el: '#app',
    router,
    store,
    render: (h) => h(App)
  }

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app,
    router,
    store
  }
}
