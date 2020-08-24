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
import boot_Styles from './boot_styles'
import boot_Version from './boot_version'

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
    boot_UI,

    // Styles
    boot_Styles
  ]

  boots.forEach(async (boot) => {
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

  // 初始化成功后
  // 检查版本信息
  if (boot_Version.validVersion()) {
    return new Vue(app)
  }
}

export default {
  install
}
