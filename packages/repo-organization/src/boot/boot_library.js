import { name, version } from '@/package.json'

// import library plugin
import Library from '@jk998/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Library, {
    config: {
      appName: name,
      appVersion: version
    }
  })

  console.log(
    `%c ${'@jk998/library'} %c ${Library.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
