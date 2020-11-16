// import library plugin
import { version, name } from './../../package.json'
import PeaceLibrary from '@jk998/library'

import Util from '@src/util'

// prototype
import '@src/library/prototype/date'
import '@src/library/prototype/number'
import '@src/library/prototype/string'

// helper
import { formatDuration, getDuration, confirm } from '@src/library/helper/util'

// directive
import drag from '@src/library/directive/drag'
import focus from '@src/library/directive/focus'

// type
import config from '@src/config'
// type
import type from '@src/type'
// service
import service from '@src/service'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(PeaceLibrary, {
    config: {
      appName: name,
      appVersion: version
    },

    http: {
      interceptors: {
        requestInterceptor: {
          then(request) {
            const userInfo = Util.user.getUserInfo()
            request.headers.accesstoken = userInfo?.list?.loginInfo?.token

            const isUrl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
            if (!isUrl.test(request.url)) {
              request.url = Peace.config.api.base + request.url
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
  Peace.config = config
  Peace.type = type
  Peace.service = service
  Peace.util.formatDuration = formatDuration
  Peace.util.getDuration = getDuration
  Peace.util.confirm = confirm

  console.log(
    `%c ${'Library'} %c ${PeaceLibrary.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
