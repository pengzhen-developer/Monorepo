/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import Vue from 'vue'

import CreateApp from './createApp'

// Quasar is required
// Some libraries depend on it
import boot_FrameworkQuasar from './boot_framework_quasar'
import boot_Library from './boot_library'
import boot_UI from './boot_ui'

// css
import './boot_ui_css/index.scss'

/**
 * Boot install
 *
 * @returns vue app instance
 */
const install = async () => {
  const { app, store, router } = await CreateApp()

  const boots = [
    // Framework
    boot_FrameworkQuasar,

    // Library
    boot_Library,

    // UI
    boot_UI
  ]

  boots.forEach(async boot => {
    try {
      await boot({
        Vue,
        app,
        store,
        router
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
