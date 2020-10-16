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

// 加载 element-ui
import ElementUI from 'element-ui'

// 加载 jk998 peace-elemetn-ui
import PeaceElementUI from '@jk998/peace-element-ui'

export default ({ Vue, configuration }) => {
  // 异步引入 ui css
  require(`./boot_theme/elementUI/${configuration.theme.primary}/theme/index.css`)
  require('@jk998/peace-element-ui/dist/peace-element-ui.css')

  Vue.use(ElementUI, { size: 'mini' })
  Vue.use(PeaceElementUI)

  console.log(
    `%c ${'ElementUI'} %c ${ElementUI.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
