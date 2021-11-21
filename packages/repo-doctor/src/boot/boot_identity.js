import PeaceIdentity from 'peace-identity'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(PeaceIdentity, {
    auth: {
      baseApi: process.env.VUE_APP_API_AUTH
    },
    socket: {
      debug: false
    }
  })
}
