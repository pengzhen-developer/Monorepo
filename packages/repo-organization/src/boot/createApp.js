/**
 * Create vue app instance
 * router & store
 *
 */

import Vue from 'vue'
import App from '@src/App.vue'

import CreateRouter from '@src/router'
import CreateStore from '@src/store'

/**
 * Create Vue App
 *
 * @export { app, router, store}
 * @returns
 */
export default async function(configuration) {
  // Create store and router instances
  const store = await CreateStore({ Vue, configuration })
  const router = await CreateRouter({ Vue, store, configuration })

  console.log(router)

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
