/*
 * @Author: PengZhen
 * @Date: 2018-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-05-05 12:44:19
 */

import Axios from 'axios'
import download from './download'
import retry from './retry'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 记录 axios 请求次数
let ajaxCount = 0

// 定义 http request 拦截器
Axios.interceptors.request.use(
  function(request) {
    ajaxCount++
    nprogress.start()

    // 基于 mock , 直接发送请求
    if (request.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return request
    }

    // 其他请求，验证 token
    else {
      // 用于将 json => form data
      // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
      // 这只适用于请求方法'PUT'，'POST'和'PATCH'
      // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
      request.transformRequest = [
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
        }
      ]

      // 配置 base url
      request.url = $peace.config.api.base + '/' + request.url

      // 配置 authorization、accesstoken
      request.headers.accesstoken = $peace.cache.get('USER') ? $peace.cache.get('USER').list.loginInfo.token : undefined

      return request
    }
  },

  function(error) {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  function(response) {
    ajaxCount--
    if (ajaxCount === 0) {
      nprogress.done(false)
    }

    // 基于 mock , 直接返回数据
    if (response.config.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return response.data
    }

    // 基于 downloadFile ，直接返回成功请求，由 download.js 自行处理
    else if (response.config.isDownload) {
      return response
    }

    // 成功处理
    else if (response.status === 200) {
      // 正常请求，并且逻辑验证成功
      if (response.data && parseInt(response.data.code) === 200) {
        return response.data
      }
      // 鉴权失败
      else if (response.data && parseInt(response.data.code) === 601) {
        $peace.util.warning(response.data.msg)

        // 移除登录消息
        $peace.cache.clear()

        // 跳转登录
        $peace.$router.replace($peace.config.theme.startPage)

        return
      }
      // 逻辑验证失败
      else {
        $peace.util.warning(response.data.msg)

        return Promise.reject(response)
      }
    }

    // 其他返回状态码处理
    // TODO : 其他状态码的处理
    else {
      $peace.util.warning(response.msg)

      return Promise.reject(response)
    }
  },

  function(error) {
    ajaxCount--
    if (ajaxCount === 0) {
      nprogress.done(false)
    }

    // 超时处理
    if (error.code === 'ECONNABORTED') {
      if (!error.config.__isRetryComplete) {
        return retry(error)
      } else {
        return Promise.reject(error)
      }
    }

    // 未知处理
    if (error.response && error.response.status) {
      switch (error.response.status) {
        default:
          $peace.util.error('Uncaught (in promise) Error: Request failed with status code' + error.response.status)
          break
      }
    } else {
      $peace.util.error('Uncaught (in promise) Error: ' + error.message)
    }

    return Promise.reject(error)
  }
)

Axios.download = download

export default Axios
