/*
 * @Author: PengZhen
 * @Date: 2018-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-10 11:18:38
 */

import Axios from 'axios'
import download from './download'
import retry from './retry'

// 定义 http request 拦截器
Axios.interceptors.request.use(
  function(request) {
    // 基于 mock , 直接发送请求
    if (request.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return request
    }

    // 其他请求，验证 token
    else {
      request.url = $peace.config.api.base + request.url

      request.headers.authorization = $peace.cache.get('USER') ? $peace.cache.get('USER').list.loginInfo.token : undefined

      return request
    }
  },

  function(error) {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  function(response) {
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
    }

    return Promise.reject(error)
  }
)

Axios.download = download

export default Axios
