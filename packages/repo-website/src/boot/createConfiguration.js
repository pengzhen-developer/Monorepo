// Get configuration from local
import localConfiguration from './boot_configuration'

// Get configuration from server
//
// const getConfiguration = () => {
//   return Peace.http.get('api/configuration')
// }

export default async () => {
  // Get configuration from local
  const configuration = localConfiguration

  // Get configuration from server
  // const configuration = await getConfiguration()

  // export configuration

  window.configuration = {
    ...configuration
  }

  return {
    configuration
  }
}
