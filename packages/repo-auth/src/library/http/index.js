/*
 * @Author: PengZhen
 * @Date: 2017-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 */

import LibraryUtil from '@src/util'
import Util from './../util'
import Axios from 'axios'
import Download from './download'
import Retry from './retry'

const errorCode = {
  '000': '操作太频繁，请勿重复请求',
  '401': '当前操作没有权限',
  '403': '当前操作没有权限',
  '404': '资源不存在',
  '417': '未绑定登录账号，请使用密码登录后绑定',
  '423': '演示环境不能操作，如需了解联系我们',
  '426': '用户名不存在或密码错误',
  '428': '验证码错误,请重新输入',
  '429': '请求过频繁',
  '479': '演示环境，没有权限操作',
  default: '系统未知错误,请反馈给管理员'
}

Axios.download = Download
Axios.defaults.headers.post['Content-Type'] = 'application/json'
// 返回其他状态码
Axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500 // 默认的
}

// Request interceptor
Axios.interceptors.request.use(
  function(config) {
    // Set Authority
    const userInfo = LibraryUtil.user.getAllUserInfo()
    //登录成功 Authorization='Bearer '+ access_token
    if (userInfo?.access_token) {
      config.headers.Authorization = 'Bearer ' + userInfo?.access_token
    }
    return config
  },

  function(error) {
    return Promise.reject(error)
  }
)

// Response interceptor
Axios.interceptors.response.use(
  function(response) {
    // Success
    const status = Number(response.status) || 200
    const message = response.data.msg || errorCode[status] || errorCode['default']

    if (status === 200) {
      if (response?.data?.code === 200 || !response.code) {
        return response.data
      }
      if (response?.data?.code === 201) {
        // Error
        Util.warning(message)
        return Promise.reject(response)
      } else if (response?.data?.code === 401) {
        // Auth fail
        Util.warning(message)
        LibraryUtil.user.removeUserInfo()
        setTimeout(() => {
          LibraryUtil.user.replaceToLogin()
        }, 1000)
        return Promise.reject(response)
      } else {
        // Unknown
        Util.warning(message)
        return Promise.reject(response.data)
      }
    } else if (status === 401) {
      Util.warning(message)
      LibraryUtil.user.removeUserInfo()
      setTimeout(() => {
        LibraryUtil.user.replaceToLogin()
      }, 1000)
      return Promise.reject(response)
    } else {
      Util.warning(message)
      return Promise.reject(response.data)
    }
  },

  function(error) {
    // Timeout and retry
    if (error.code === 'ECONNABORTED') {
      if (!error.config.__isRetryComplete) {
        return Retry(error)
      } else {
        return Promise.reject(error)
      }
    }

    // Network error
    else if (error?.toString() === 'Error: Network Error') {
      Util.error('网络请求错误')

      return Promise.reject(error)
    }

    // 未知错误
    else if (error?.response?.status) {
      switch (error.response.status) {
        //Auth fail
        case 401:
          Util.warning('用户凭证已过期')

          LibraryUtil.user.removeUserInfo()
          setTimeout(() => {
            LibraryUtil.user.replaceToLogin()
          }, 1000)
          break
        default:
          Util.error('服务器异常，请稍后再试', '提示', 'error')
          break
      }
    } else {
      console.log(error)
      Util.error('服务器异常，请稍后再试', '提示', 'error')
    }

    return Promise.reject(error)
  }
)

export default Axios
