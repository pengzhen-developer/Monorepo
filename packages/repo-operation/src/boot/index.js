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

//global style
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

    // UI
    boot_UI,

    //global style
    boot_styles,

    // Framework
    boot_Quasar
  ]

  for (const boot of boots) {
    try {
      await boot({
        Vue,
        configuration
      })
    } catch (error) {
      console.error('[Library] boot error:', error)
    }
  }

  const { app } = await CreateApp(configuration)

  return new Vue(app)
}

export default {
  install
}
