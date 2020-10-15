import { name, version } from '@/package.json'

import LibraryUtil from '@src/util'

// import library plugin
import Peace from '@jk998/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace.install, {
    config: {
      appName: name,
      appVersion: version
    },
    http: {
      interceptors: {
        requestInterceptor: {
          then(config) {
            if (LibraryUtil.user.getUserInfo()) {
              config.headers.token = LibraryUtil.user.getUserInfo().token
            }

            return config
          }
        }
      }
    }
  })

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
