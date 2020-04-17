/*
 * @Author: PengZhen
 * @Date: 2017-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 */
import axios from 'axios'
import download from './download'
import mock from './mock'
import retry from './retry'

import { user } from '@src/util'
import { warning } from './../util'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

axios.download = download
axios.mock = mock

axios.defaults.headers.post['Content-Type'] = 'application/json'

// request count
let requestCount = 0

// Request interceptor
axios.interceptors.request.use(
  function(config) {
    requestCount++

    // Loading
    nprogress.start()

    // json => form data
    // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
    // 这只适用于请求方法'PUT'，'POST'和'PATCH'
    // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
    if (config.headers[config.method]['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.transformRequest = [
        function(data) {
          const formData = new FormData()
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              if (data[key] !== undefined && data[key] !== null) {
                if (data[key] instanceof Array || data[key] instanceof Object) {
                  formData.append(key, JSON.stringify(data[key]))
                } else {
                  formData.append(key, data[key])
                }
              }
            }
          }

          return formData
        },
      ]
    }

    // Set Authority
    const userInfo = user.getUserInfo()
    if (userInfo?.token) {
      config.headers.Token = userInfo?.token
    }

    return config
  },

  function(error) {
    requestCount--

    // Loading
    if (requestCount === 0) {
      nprogress.done(false)
    }

    return Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  function(response) {
    requestCount--

    // Is mock
    if (response?.config?.params?.isMock) {
      const delay = response.config.params.mockDelay
      const delayTime = new Date() - response.config.params.mockDate
      return new Promise((resolve) => {
        setTimeout(function() {
          resolve(response.data)

          // Loading
          if (requestCount === 0) {
            nprogress.done(false)
          }
        }, delay - delayTime)
      })
    }

    // else
    else {
      // Loading
      if (requestCount === 0) {
        nprogress.done(false)
      }

      // Success
      if (response?.data?.code === 200) {
        return response.data
      }

      // Auth fail
      else if (response?.data?.code === 601) {
        warning(response.data.msg)

        user.removeUserInfo()
        user.replaceToLogin()

        return Promise.reject(response)
      }

      // Unknown
      else {
        warning(response?.data?.msg)

        return Promise.reject(response.data)
      }
    }
  },

  function(error) {
    requestCount--

    // loading
    if (requestCount === 0) {
      nprogress.done(false)
    }

    // Timeout and retry
    if (error.code === 'ECONNABORTED') {
      if (!error.config.__isRetryComplete) {
        return retry(error)
      } else {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axios
