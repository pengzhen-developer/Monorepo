// Get configuration from local
import localConfiguration from './boot_configuration'

// Get configuration from server

export default async () => {
  // Get configuration from local
  const configuration = localConfiguration
  // Get configuration from server

  // export configuration

  window.configuration = {
    ...configuration
  }

  return {
    configuration
  }
}
