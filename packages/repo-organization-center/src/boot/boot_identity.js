import PeaceIdentity from 'peace-identity'
// import CreateSocket from '@src/socket'

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

  // CreateSocket({ Vue, configuration })
}
