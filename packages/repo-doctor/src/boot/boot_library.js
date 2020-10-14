// import library plugin
import { version, name } from './../../package.json'
import Peace from '@jk998/library'

// prototype
import '@src/library/prototype/date'
import '@src/library/prototype/number'
import '@src/library/prototype/string'

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
  Vue.use(Peace, {
    config: {
      appName: name,
      appVersion: version
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
