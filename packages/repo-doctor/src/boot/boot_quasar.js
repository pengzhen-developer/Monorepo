/**
 * Quasar Library
 * This library is required
 *
 * Reference: https://quasar.dev/
 **/

import langDe from 'quasar/lang/zh-hans'
import { Quasar, LoadingBar, Notify, LocalStorage, SessionStorage, Cookies } from 'quasar'

export default ({ Vue, configuration }) => {
  // 异步引入 ui css
  require('quasar/dist/quasar.css')
  require('@quasar/extras/material-icons/material-icons.css')

  Vue.use(Quasar, {
    lang: langDe,

    animations: 'all',

    components: {
      /* not needed if importStrategy is not 'manual' */
    },

    directives: {
      /* not needed if importStrategy is not 'manual' */
    },

    plugins: {
      LoadingBar,
      Notify,

      LocalStorage,
      SessionStorage,
      Cookies
    },

    config: {
      brand: {
        primary: configuration.theme.primary
      },
      loadingBar: {
        size: '4px',
        color: 'grey-1'
      },
      notify: {
        position: 'top',
        color: 'primary'
      }
    }
  })

  console.log(
    `%c ${'Quasar'} %c ${Quasar.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
