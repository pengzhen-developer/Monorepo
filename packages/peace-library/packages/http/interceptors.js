import axios from 'axios'

import retry from './retry'
import { warning } from './../tools/util/message'
import { Loading } from 'element-ui'

let loadingStatus
let loadingInstance
let loadingInstanceCount = 0

export function createInterceptor(options) {
  const requestInterceptor = {
    then: function(config) {
      // 处理 Loading，局部配置 > 全局配置
      loadingStatus = config?.axiosHandleLoading ?? options?.axiosHandleLoading
      if (loadingStatus) {
        loadingInstanceCount += 1
        loadingInstance = Loading.service({ background: 'rgba(0, 0, 0, 0.1)' })
      }

      return Promise.resolve(config)
    },

    catch: function(error) {
      loadingInstanceCount = 0
      loadingInstance && loadingInstance.close()

      return Promise.reject(error)
    }
  }

  const responseInterceptor = {
    then: function(response) {
      // 处理 Loading，局部配置 > 全局配置
      loadingStatus = response?.config?.axiosHandleLoading ?? options?.axiosHandleLoading
      if (loadingStatus) {
        loadingInstanceCount -= 1
        if (loadingInstanceCount <= 0) {
          loadingInstance && loadingInstance.close()
        }
      }

      // 放弃拦截器，自行处理请求
      if (response.config.isInterceptor === false) {
        return response
      }

      // 文件下载 ，由 download.js 处理
      if (response.config.isDownload) {
        return response
      }

      if (response.data) {
        switch (response.data.code) {
          case 200:
            return Promise.resolve(response.data)

          case 201:
            warning(response.data.msg || response.data.message)

            return Promise.reject(response)
        }
      }

      return Promise.reject(response)
    },

    catch: function(error) {
      loadingInstanceCount = 0
      loadingInstance && loadingInstance.close()

      // Cancel error
      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }

      // Network error
      if (!error.status) {
        warning('网络异常，请稍后再试', 'error')

        return Promise.reject(error)
      }

      // 放弃拦截器，自行处理请求
      if (error?.response?.config?.isInterceptor === false) {
        return Promise.reject(error)
      }

      // Timeout and retry
      if (error?.code === 'ECONNABORTED') {
        if (!error?.config?.__isRetryComplete) {
          return retry(error)
        } else {
          return Promise.reject(error)
        }
      }

      // 已知错误
      if (error.response) {
        switch (error?.response?.status) {
          // 鉴权问题，由 websocket 处理
          case 401:
          case 403:
            return Promise.reject(error)
        }
      }

      warning('系统暂时无法处理你的请求，请稍后再试', 'error')

      return Promise.reject(error.response.data)
    }
  }

  return {
    requestInterceptor,
    responseInterceptor
  }
}
