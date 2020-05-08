/*
 * @Author: PengZhen
 * @Date: 2017-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 */

import util from '@src/util'
import axios from 'axios'
import download from './download'
import retry from './retry'

import Router from '@src/router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

let router = Router()

// 记录 http 请求次数
let httpCount = 0

// 挂载实例方法
axios.download = download

// 定义 http request 拦截器
axios.interceptors.request.use(
  function(request) {
    httpCount++
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
      if (request.headers[request.method]['Content-Type'] === 'application/x-www-form-urlencoded') {
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
      }

      // 配置 authorization、accesstoken
      const userInfo = util.user.getUserInfo()
      request.headers.accesstoken = userInfo?.list?.loginInfo?.token

      // 配置 base url
      const isUrl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      if (!isUrl.test(request.url)) {
        request.url = $peace.config.api.base + request.url
      }

      return request
    }
  },

  function(error) {
    httpCount--
    if (httpCount === 0) {
      nprogress.done(false)
    }

    return Promise.reject(error)
  }
)

// 定义 http response 拦截器
axios.interceptors.response.use(
  function(response) {
    httpCount--
    if (httpCount === 0) {
      nprogress.done(false)
    }

    // 基于 mock , 直接返回数据
    if (response.config.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return response.data
    }

    // 基于 downloadFile ，直接返回成功请求，由 download.js 接管
    else if (response.config.isDownload) {
      return response
    }

    // 成功处理
    else if (response.status === 200) {
      // 请求正常，并且逻辑验证成功
      if (response.data && parseInt(response.data.code) === 200) {
        return response.data
      }

      // 请求正常，并且逻辑验证失败
      else if (response.data && parseInt(response.data.code) === 201) {
        $peace.util.alert(response.data.msg, null, $peace.type.SYSTEM.MESSAGE.ERROR)

        return Promise.reject(response)
      }

      // 请求正常，IM 状态异常
      else if (response.data && parseInt(response.data.code) === 2002) {
        $peace.util.alert('通讯异常, 将于 3 秒后刷新重连')

        setTimeout(() => {
          window.location.reload()
        }, 1000 * 3)

        return Promise.reject(response)
      }

      // 鉴权失败
      else if (response.data && parseInt(response.data.code) === 601) {
        // 提示鉴权失败消息
        $peace.util.alert(response.data.msg, null, $peace.type.SYSTEM.MESSAGE.ERROR)
        // 清空用户缓存
        util.user.removeUserInfo()
        // 跳转提示页
        router.replace($peace.config.system.noAuthPage)

        setTimeout(() => {
          window.location.reload()
        }, 1000 * 3)

        return Promise.reject(response)
      }
      // 逻辑验证失败
      else {
        $peace.util.alert(response.data.msg, null, $peace.type.SYSTEM.MESSAGE.ERROR)

        return Promise.reject(response)
      }
    }

    // 其他返回状态码处理
    // TODO : 其他状态码的处理
    else {
      return Promise.reject(response)
    }
  },

  function(error) {
    httpCount--
    if (httpCount === 0) {
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

    // 未知错误
    if (error.response && error.response.status) {
      switch (error.response.status) {
        default:
          $peace.util.alert('服务器异常，请稍后再试', '提示', 'error')
          break
      }
    } else {
      $peace.util.alert('服务器异常，请稍后再试', '提示', 'error')
    }

    return Promise.reject(error)
  }
)

export default axios
