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
import PeaceImport from '@src/views/components/peace-import'

export default ({ Vue }) => {
  // 异步引入 ui css
  require(`@jk998/peace-element-ui/dist/peace-element-ui.css`)

  Vue.use(ElementUI, { size: 'mini' })
  Vue.use(PeaceElementUI)
  Vue.use(PeaceImport)

  console.log(
    `%c ${'ElementUI'} %c ${ElementUI.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
