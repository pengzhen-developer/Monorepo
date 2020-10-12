// import library plugin
import Peace from '@jk998/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace, {
    config: {
      appName: 'jk998',
      appVersion: '0.1.12'
    }
  })

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
