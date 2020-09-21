/**
 * 格式化url占位符
 * eg: http://localhost:8080/yunpan/{id}/aaa/{name}
 * urlFormat(url, {id: '111', name: 'yc'})
 * => http://localhost:8080/yunpan/111/aaa/yc

 * @paarm url
 * @param param
 * @returns {*}
 */
export const urlFormat = (url, param) => {
  if (param === undefined || param === null || JSON.stringify(param) === '{}' || param === '') {
    return url
  }
  if (url.indexOf('{') === -1 || url.indexOf('{') === -1) {
    return url
  }
  Object.keys(param).map((key) => {
    url = url.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key])
  })

  return url
}
export default {
  urlFormat
}
