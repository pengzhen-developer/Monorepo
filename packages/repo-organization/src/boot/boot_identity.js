import Identity from '@jk998/identity'
import CreateSocket from '@src/socket'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Identity, {
    auth: {
      baseApi: process.env.VUE_APP_API_AUTH
    },
    socket: {
      debug: false
    }
  })

  CreateSocket()

  console.log(
    `%c ${'@jk998/identity'} %c ${Identity.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
