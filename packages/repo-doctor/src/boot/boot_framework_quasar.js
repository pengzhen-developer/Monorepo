/**
 * Quasar Library
 * This library is required
 *
 * Reference: https://quasar.dev/
 **/

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

import langDe from 'quasar/lang/zh-hans'
import { Quasar, Notify, LocalStorage, SessionStorage, Cookies } from 'quasar'

export default ({ Vue }) => {
  Vue.use(Quasar, {
    lang: langDe,

    components: {
      /* not needed if importStrategy is not 'manual' */
    },

    directives: {
      /* not needed if importStrategy is not 'manual' */
    },

    plugins: {
      Notify,

      LocalStorage,
      SessionStorage,
      Cookies
    },

    config: {
      brand: {
        primary: '#00C6AE'
      },
      notify: {
        position: 'top',
        color: 'primary'
      }
    }
  })

  console.log(
    `%c ${'Framework.Quasar'} %c ${Quasar.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
