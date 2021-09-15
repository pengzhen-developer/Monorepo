const RSETfulFormat = (url, param) => {
  //处理param 异常
  if (param === undefined || param === null || JSON.stringify(param) === '{}' || param === '') {
    return url
  }
  //处理url无 {变量}
  if (url.indexOf('{') === -1 || url.indexOf('{') === -1) {
    return url
  }
  //处理 {key}==>{value}
  Object.keys(param).map((key) => {
    url = url.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key])
  })
  //处理 url中的变量 在param中没有
  url = url.replace(/\{(.+?)\}/g, '').replace(/\/\//g, '/')
  return url
}

export default class DictionaryService {
  constructor(config) {
    if (!config.baseApi) {
      throw new Error('BaseApi is required')
    }

    this.config = config
  }

  GET(params) {
    const apiPath = `admin/dict/type/{type}`
    const apiPathFormated = RSETfulFormat(apiPath, params)

    const requestApi = this.config.baseApi + apiPathFormated

    return Peace.http.get(requestApi, params)
  }
}
