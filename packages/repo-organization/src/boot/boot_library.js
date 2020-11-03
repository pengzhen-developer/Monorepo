import { name, version } from '@/package.json'

// import library plugin
import Peace from '@jk998/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace, {
    config: {
      appName: name,
      appVersion: version
    }
  })

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
