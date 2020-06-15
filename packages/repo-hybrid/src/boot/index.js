/**
 *
 * Boot files are your "main.js"
 **/

import Vue from 'vue'

import CreateConfiguration from './createConfiguration'
import CreateApp from './createApp'

import boot_Library from './boot_library'

// Quasar is required
// Some libraries depend on it
import boot_Quasar from './boot_quasar'

// UI Library
import boot_UI from './boot_ui'

/**
 * Boot install
 *
 * @returns vue app instance
 */
const install = async () => {
  const { configuration } = await CreateConfiguration()
  const { app, store, router } = await CreateApp(configuration)

  const boots = [
    // Library
    boot_Library,

    // Framework
    boot_Quasar,

    // UI
    boot_UI
  ]

  boots.forEach(async (boot) => {
    try {
      await boot({
        Vue,
        app,
        store,
        router,
        configuration
      })
    } catch (error) {
      console.error('[Library] boot error:', error)

      return
    }
  })

  return new Vue(app)
}

export default {
  install
}
