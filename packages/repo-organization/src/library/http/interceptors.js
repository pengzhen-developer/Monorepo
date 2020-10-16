import LibraryUtil from '@src/util'

export const requestInterceptor = {
  then: function(config) {
    return config
  },

  catch: function(error) {
    return Promise.reject(error)
  }
}

export const responseInterceptor = {
  then: function(response) {
    // 基于 downloadFile ，直接返回成功请求，由 download.js 接管
    if (response.config.isDownload) {
      return response
    }

    // Success
    if (response?.data?.code === 200) {
      return response.data
    }

    // Error
    if (response?.data?.code === 201) {
      Peace.util.warning(response.data.msg)

      return Promise.reject(response)
    }

    // Auth fail
    else if (response?.data?.code === 403) {
      // Auth fail 返回官网登录页
      Peace.util.warning(response.data.msg)

      setTimeout(() => {
        Peace.identity.auth.removeAll()
        LibraryUtil.user.removeUserInfo()
        LibraryUtil.referer.redirectToReferer('login')
      }, 2000)

      return Promise.reject(response)
    }

    // Unknown
    else {
      Peace.util.warning(response.data.msg)

      return Promise.reject(response.data)
    }
  },

  catch: function(error) {
    // Network error
    if (error?.toString() === 'Error: Network Error') {
      Peace.util.error('网络请求错误')

      return Promise.reject(error)
    }

    // 未知错误
    else if (error?.response?.status) {
      switch (error.response.status) {
        //Auth fail
        case 401:
          // Auth fail 返回官网登录页
          Peace.util.warning('用户凭证已过期')

          Peace.identity.auth.removeAll()
          LibraryUtil.user.removeUserInfo()
          LibraryUtil.referer.redirectToReferer('login')
          break
        default:
          Peace.util.error('服务器异常，请稍后再试', '提示', 'error')
          break
      }
    } else {
      Peace.util.error('服务器异常，请稍后再试', '提示', 'error')
    }

    return Promise.reject(error)
  }
}

export default {
  requestInterceptor,

  responseInterceptor
}
