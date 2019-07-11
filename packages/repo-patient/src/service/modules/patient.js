import peace from '@src/library'

/**
 * 获取我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMyFamilyList(params) {
  const getMyFamilyList = 'client/v1/Patient/getMyFamilyList'

  return peace.http.post(getMyFamilyList, params)
}

/**
 * 请求登录
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function login(params) {
  const login = 'h5/v1/Account/login'

  return peace.http.post(login, params)
}

export default {
  /** 获取我的家人 */
  getMyFamilyList,
  /** 登录 */
  login
}
