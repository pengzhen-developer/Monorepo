/**
 * 格式化url占位符
 * eg: http://localhost:8080/yunpan/{id}/aaa/{name}
 * RSETfulFormat(url, {id: '111', name: 'yc'})
 * => http://localhost:8080/yunpan/111/aaa/yc
 *eg: http://localhost:8080/yunpan/{id}/{aaa}/{name}
 * RSETfulFormat(url, {id: '111', name: 'yc'})
 *  => http://localhost:8080/yunpan/111/yc
 * @paarm url
 * @param param
 * @returns {*}
 */
export const RSETfulFormat = (url, param) => {
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
export default {
  RSETfulFormat
}
