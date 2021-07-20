/**
 * Quasar Library
 * See: https://quasar.dev/
 **/

/**
 * ElementUI 作为 main UI，全量加载即可
 *
 * 要实现按需加载，请参考（无法动态改变主题）:
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

import ElementUI from 'element-ui'
import PeaceElementUI from '@jk998/peace-element-ui'
import Fragment from 'vue-fragment'
import Viewer from 'v-viewer'

export default ({ Vue }) => {
  // 异步引入 ui css
  // require(`./boot_theme/elementUI/${configuration.theme.primary}/theme/index.css`)
  require(`@jk998/peace-element-ui/dist/peace-element-ui.css`)
  require(`viewerjs/dist/viewer.css`)

  Vue.use(ElementUI, { size: 'mini' })
  Vue.use(PeaceElementUI)
  Vue.use(Fragment.Plugin)
  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999,
      navbar: false,
      title: false,
      toolbar: true,
      tooltip: false
    }
  })

  console.log(
    `%c ${'ElementUI'} %c ${ElementUI.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
