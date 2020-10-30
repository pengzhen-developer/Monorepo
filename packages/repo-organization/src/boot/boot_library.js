import { name, version } from '@/package.json'

// import library plugin
import Peace from '@jk998/library'
import Identity from '@jk998/identity'
import CreateSocket from '@src/socket'
import { requestInterceptor, responseInterceptor } from '../library/http/interceptors'

// export boot install function
// async is optional
export default async ({ Vue, configuration }) => {
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
    auth: {
      // auth api
      baseApi: process.env.VUE_APP_API_AUTH
    }
  })

  console.log(
    `%c ${'Identity'} %c ${Identity.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )

  CreateSocket({ Vue, configuration })
}
