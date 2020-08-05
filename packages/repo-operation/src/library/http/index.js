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

Axios.download = Download
Axios.defaults.headers.post['Content-Type'] = 'application/json'

// Request interceptor
Axios.interceptors.request.use(
  function(config) {
    // Set Authority
    const userInfo = LibraryUtil.user.getUserInfo()
    if (userInfo?.token) {
      config.headers.Token = userInfo?.token
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
    if (response?.data?.code === 200) {
      return response.data
    }

    // Error
    if (response?.data?.code === 201) {
      Util.warning(response.data.msg)

      return Promise.reject(response)
    }

    // Auth fail
    else if (response?.data?.code === 403) {
      Util.warning(response.data.msg)

      LibraryUtil.user.removeUserInfo()
      setTimeout(() => {
        LibraryUtil.user.replaceToLogin()
      }, 1000)

      return Promise.reject(response)
    }

    // Unknown
    else {
      Util.warning(response.data.msg)

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
        default:
          Util.error('服务器异常，请稍后再试', '提示', 'error')
          break
      }
    } else {
      Util.error('服务器异常，请稍后再试', '提示', 'error')
    }

    return Promise.reject(error)
  }
)

export default Axios
