// import library plugin
import { version, name } from './../../package.json'
import Peace from '@jk998/library'

import util from '@src/util'

// prototype
import '@src/library.back/prototype/date'
import '@src/library.back/prototype/number'
import '@src/library.back/prototype/string'

// directive
import drag from '@src/library.back/directive/drag'
import focus from '@src/library.back/directive/focus'

// type
import config from '@src/config'
// type
import type from '@src/type'
// service
import service from '@src/service'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace, {
    config: {
      appName: name,
      appVersion: version
    },

    http: {
      interceptors: {
        requestInterceptor: {
          then(request) {
            const userInfo = util.user.getUserInfo()
            request.headers.accesstoken = userInfo?.list?.loginInfo?.token

            const isUrl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
            if (!isUrl.test(request.url)) {
              request.url = $peace.config.api.base + request.url
            }

            return request
          }
        }
      }
    }
  })

  // 注册 directive
  const directive = [drag, focus]
  directive.map((directive) => {
    Vue.directive(directive.name, directive)
  })

  /* eslint-disable */
  peace.config = config
  peace.type = type
  peace.service = service

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
