/**
 *
 * Boot files are your "main.js"
 **/

import Vue from 'vue'

import CreateConfiguration from './createConfiguration'
import CreateApp from './createApp'

import boot_Library from './boot_library'
import boot_Redirect from './boot_redirect'
import boot_Identity from './boot_identity'

// UI Library
import boot_UI from './boot_ui'

// Quasar is required
// Some libraries depend on it
import boot_Quasar from './boot_quasar'

// global style
import boot_styles from './boot_styles'

/**
 * Boot install
 *
 * @returns vue app instance
 */
const install = async () => {
  const { configuration } = await CreateConfiguration()

  const boots = [
    // Library
    boot_Library,

    // redirect
    boot_Redirect,

    // identity
    boot_Identity,

    // UI
    boot_UI,

    // Framework
    boot_Quasar,

    // global style
    boot_styles
  ]

  for (const boot of boots) {
    try {
      await boot({
        Vue,
        configuration
      })
    } catch (error) {
      console.error('[Library] boot error:', error)

      throw error
    }
  }

  const { app } = await CreateApp(configuration)

  return new Vue(app)
}

export default {
  install
}
