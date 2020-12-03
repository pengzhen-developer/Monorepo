/**
 *
 * Boot files are your "main.js"
 **/

import Vue from 'vue'

import CreateConfiguration from './createConfiguration'
import CreateApp from './createApp'

import boot_Library from './boot_library'
import boot_Redirect from './boot_redirect'

// Quasar is required
// Some libraries depend on it
import boot_Quasar from './boot_quasar'

// UI Library
import boot_UI from './boot_ui'

// global style
import boot_styles from './boot_styles'

// Version
import boot_Version from './boot_version'

/**
 * Boot install
 *
 * @returns vue app instance
 */
const install = async () => {
  const { configuration } = await CreateConfiguration()

  const boots = [
    // Framework
    boot_Quasar,

    // Library
    boot_Library,

    // Version
    boot_Version,

    // Redirect
    boot_Redirect,

    // UI
    boot_UI,

    // global style
    boot_styles
  ]

  for (const boot of boots) {
    try {
      await boot({ Vue, configuration })
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
