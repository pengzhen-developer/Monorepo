// import library plugin
import { name, version } from '@/package.json'
import PeaceLibrary from 'peace-library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(PeaceLibrary, {
    config: {
      appName: name,
      appVersion: version
    }
  })
}
