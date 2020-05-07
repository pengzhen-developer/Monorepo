/**
 * Quasar Library
 * See: https://quasar.dev/
 **/

/**
 * ElementUI 作为 main UI，全量加载即可
 *
 * 要实现按需加载，请参考:
 *
 * step 1, Add dependencies
 *         ``` bash
 *             yarn add babel-plugin-component -D
 *         ```
 * step 2, Paste code
 *          babel.config.js
 *          [
 *            'component',
 *            {
 *              libraryName: 'element-ui',
 *              styleLibraryName: '~src/boot/boot-element-ui-theme',
 *            },
 *          ],
 *
 */
// ElementUI
import ElementUI from 'element-ui'
import './boot_ui_element-theme/default/theme/index.css'
import './boot_ui_element-theme/default/theme/element-fix.scss'

// Viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

export default ({ Vue }) => {
  Vue.use(ElementUI, { size: 'mini' })

  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999
    }
  })

  console.log(
    `%c ${'UI'} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
