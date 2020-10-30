import Identity from '@jk998/identity'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Identity, {
    baseApi: process.env.VUE_APP_API_AUTH
  })

  console.log(
    `%c ${'Identity'} %c ${Identity.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
