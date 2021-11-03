// import library plugin
import { name, version } from '@/package.json'
import PeaceLibrary from 'peace-library'

import Util from '@src/util'

// prototype
import '@src/library/prototype/date'
import '@src/library/prototype/number'
import '@src/library/prototype/string'

// helper
import { formatDuration, getDuration, confirm } from '@src/library/helper/util'

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

            if (userInfo?.list?.loginInfo?.token) {
              request.headers.accesstoken = userInfo?.list?.loginInfo?.token
            }

            const isUrl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
            if (!isUrl.test(request.url)) {
              request.url = process.env.VUE_APP_API_BASE + request.url
            }

            return request
          }
        },
        responseInterceptor: {
          then(response) {
            // 文件下载 ，由 download.js 处理
            if (response.config.isDownload) {
              return response
            }

            if (response.data) {
              switch (response.data.code) {
                case 200:
                  return Promise.resolve(response.data)

                case 201:
                  Peace.util.warning(response.data.msg)

                  return Promise.reject(response)

                case 601:
                  if (!Peace.ErrorMessageDown) {
                    Peace.ErrorMessageDown = true

                    Peace.util.warning(response.data.msg)
                  }

                  Util.user.removeUserInfo()

                  setTimeout(() => {
                    Util.location.redirectToLogin()
                  }, 2000)

                  return Promise.reject(response)
              }
            }

            Peace.util.error(response.data.msg)

            return Promise.reject(response)
          }
        }
      }
    }
  })

  /* eslint-disable */
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
