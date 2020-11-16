import Package from './../../package.json'

/**
 * 获取服务端版本信息
 *
 * @param {*} params
 * @returns
 */
const getServerVersion = (params) => {
  const isMock = false

  const apiPath = 'common/system/getVersionInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

/**
 * 获取服务端时间戳
 *
 * @param {*} params
 * @returns
 */
const getServerTimestamp = (params) => {
  const isMock = false

  const apiPath = 'common/system/getServerTime'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

export default {
  /**
   * 校验版本信息
   *
   * @returns
   */
  async validVersion() {
    const serverVersion = await getServerVersion()
    const serverTimestamp = await getServerTimestamp()
    const localVersion = Package.version

    if (Math.abs(serverTimestamp.data.timestamp - new Date()) > 60 * 1000) {
      console.error('当前操作系统时间不正确')
    }

    if (serverVersion.data.version === localVersion) {
      Peace.cache.sessionStorage.set('version', serverVersion, 'sessionStorage')

      return true
    } else {
      Peace.util.warning('您当前访问的系统版本过低，请清除浏览器缓存后重新刷新本页面')

      return false
    }
  }
}
