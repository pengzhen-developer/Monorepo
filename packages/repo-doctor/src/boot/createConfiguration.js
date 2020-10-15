// Get configuration from local
import localConfiguration from './boot_configuration'

// // Get configuration from server
//

// const getConfiguration = (params) => {
//   const isMock = true

//   const apiPath = 'api/uims/configuration/getConfiguration'
//   const mockPath = process.env.VUE_APP_MOCK_API + apiPath
//   const serverPath = process.env.VUE_APP_BASE_API + apiPath

//   const requestApi = isMock ? mockPath : serverPath

//   return Peace.http.get(requestApi, params).then((res) => {
//     return res.data
//   })
// }

export default async () => {
  // Get configuration from local
  const configuration = localConfiguration

  // // Get configuration from server
  // const configuration = await getConfiguration()

  // export configuration
  window.configuration = {
    ...configuration
  }

  return {
    configuration
  }
}
