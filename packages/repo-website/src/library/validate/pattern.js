export const pattern = {
  /**
   * 用户名验证
   * 接受字母,数字, _ , 4-30位
   */
  username: /^[a-zA-Z0-9_]{4,30}$/,

  /**
   * 密码验证
   * 接受字母,数字, _ , 6-20位
   */
  password: /^[a-zA-Z0-9_]{6,20}$/,

  /** url 验证 */
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,

  /** number 验证, 包括正负整数 */
  number: /^[-+]?[0-9]*$/,

  /** numerical 验证, 包括整数、浮点数、正、负数 */
  numerical: /^[-+]?[0-9]+(\.[0-9]+)?$/,

  /** pNumerical 验证, 包括正整数、浮点数 */
  pNumerical: /^[0-9]+(\.[0-9]+)?$/,

  /** integer 验证, 验证整数 */
  interger: /^[0-9]*$/,

  /** pInteger 验证, 验证正整数 */
  pInterger: /^[1-9]\d*$/,

  /** nInterger 验证, 验证负整数及0 */
  nInterger: /^((-\d+)|(0+))$/,

  /** mobile 验证, 验证手机号码 */
  mobile: /^1[34578]\d{9}$/,

  /** telephone 验证,验证电话号码 */
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

  /** idCard 验证,验证身份证号 */
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  /** email 验证,验证邮箱 */
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  /** 百分数验证，数字在1-99之间，保留一位小数 */
  percente: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
}

export default pattern
