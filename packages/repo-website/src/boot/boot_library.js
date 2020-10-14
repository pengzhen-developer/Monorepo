import { name, version } from '../../package.json'

// import library plugin
import Peace from '@jk998/library'

import Identity from '@jk998/identity'

import { requestInterceptor, responseInterceptor } from '../library/http/interceptors'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace, {
    config: {
      appName: name,
      appVersion: version
    },
    http: {
      // .e.g
      // requestInterceptor: { then: function() {}, catch: function() {} }
      // responseInterceptor: { then: function() {}, catch: function() {} }
      interceptors: {
        requestInterceptor: requestInterceptor,
        responseInterceptor: responseInterceptor
      }
    }
  })

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )

  Vue.use(Identity, {
    baseApi: process.env.VUE_APP_AUTH_API
  })

  console.log(
    `%c ${'Identity'} %c ${Identity.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
