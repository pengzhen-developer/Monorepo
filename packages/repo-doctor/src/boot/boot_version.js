import { version } from './../../package.json'

const Service = {
  Version: {
    /**
     * 获取最新版本信息
     *
     * @param {*} params
     * @returns
     */
    getInfo(params) {
      const isMock = false

      const apiPath = 'client/base/version/getInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_BASE + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params, { headers: { deviceType: 'pc' } }).then((res) => {
        return res
      })
    }
  },

  Config: {
    getInfo(params) {
      const isMock = false

      const apiPath = 'client/base/config/getInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_BASE + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, params).then((res) => {
        return res
      })
    }
  }
}

export default async (/* { Vue, configuration } */) => {
  // PC 端暂不需要验证
  // 验证最新版本信息
  const versionInfo = await Service.Version.getInfo({ versionName: version })

  // 获取应用基础信息
  const configInfo = await Service.Config.getInfo()

  Peace.cache.sessionStorage.set('version', versionInfo.data)
  Peace.cache.sessionStorage.set('config', configInfo.data)

  return true
}
