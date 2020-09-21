import Peace from '@src/library'

/** 用户token常量 */
const USER_TOKEN = 'user_token'

/**
 * 设置token
 * @param {*} token
 */
export const setToken = (token) => {
  return Peace.cache.localStorage.set(USER_TOKEN, token)
}

/**
 * 获取token
 * @param {*} userToken
 */
export const getToken = () => {
  return Peace.cache.localStorage.get(USER_TOKEN)
}

/**
 * 清空token
 */
export const removeToken = () => {
  Peace.cache.localStorage.remove(USER_TOKEN)
}

export default {
  setToken,
  getToken,
  removeToken
}
