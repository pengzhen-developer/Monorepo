/**
 *
 * Boot files are your "main.js"
 **/

import Vue from 'vue'

import CreateConfiguration from './createConfiguration'
import CreateApp from './createApp'

import boot_Library from './boot_library'
import boot_Rediarect from './boot_redirect'
import boot_Identity from './boot_identity'

// Quasar is required
// Some libraries depend on it
import boot_Quasar from './boot_quasar'

// UI Library
import boot_UI from './boot_ui'

// global style
import boot_styles from './boot_styles'

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

    // rediarect
    boot_Rediarect,

    // identity
    boot_Identity,

    // Framework
    boot_Quasar,

    // UI
    boot_UI,

    // global style
    boot_styles
  ]

  for (const boot of boots) {
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

      throw error
    }
  }

  return new Vue(app)
}

export default {
  install
}
