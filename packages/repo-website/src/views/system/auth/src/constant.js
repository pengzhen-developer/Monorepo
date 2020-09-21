/** 操作模式 */
export const action = {
  /** 手机号登录 */
  SIGN_BY_PHONE: 'SignByPhone',
  /** 用户名密码登录 */
  SIGN_BY_USERNAME: 'SignByUserName',
  /** 重置密码 */
  RESET_PASSWORD: 'ResetPassword',
}
/** 审核状态 */
export const ENUM_CHECK_STATUS = {
  未申请: 1,
  待审核: 2,
  已通过: 3,
  未通过: 4,
}
export default {
  /** 操作模式 */
  action,
  ENUM_CHECK_STATUS,
}
