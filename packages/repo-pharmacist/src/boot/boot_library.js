// import library plugin
import { version, name } from '@/package'

import Peace from '@jk998/library'
import Identity from '@jk998/identity'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace, {
    config: {
      appName: name,
      appVersion: version
    }
  })

  Vue.use(Identity, {
    baseApi: process.env.VUE_APP_API_BASE
  })

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
