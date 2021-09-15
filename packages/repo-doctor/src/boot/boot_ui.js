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
import PeaceUI from 'peace-ui'
import 'peace-ui/assets/css/index.scss'
import Fragment from 'vue-fragment'
import Viewer from 'v-viewer'

export default ({ Vue }) => {
  Vue.use(ElementUI, { size: 'mini' })
  Vue.use(PeaceUI)
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
}
