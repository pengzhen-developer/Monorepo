/**
 *
 * @param {*} str 字符串
 * @param {*} isNotFull 是否开启非标准匹配模式（标准模式：国-省（市）-市-区）
 */
const filterRegion = (str) => {
  // if (true) {
  //   return str
  // }
  const reg = /^(.+?(省|市|自治区|自治州|县|区)){0,3}/g
  const regTrim = /(^\s*)|(\s*$)/g

  return str
    .replace(str.match(reg).join(''), '')
    .replace(regTrim, '')
    .replace('中国', '')
}
export { filterRegion }
