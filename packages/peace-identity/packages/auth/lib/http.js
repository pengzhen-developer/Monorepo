/**
 *http
 *
 * @export
 * @returns
 */
export default function createHttpInstance() {
  let Http = peace && peace.http.create({})

  // Request interceptor
  Http.interceptors.request.use(
    function(config) {
      return config
    },

    function(error) {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  Http.interceptors.response.use(
    function(response) {
      // Login（兼容登陆接口成功时无状态码的问题）
      if (response.data && !response.data.code) {
        return {
          code: 200,
          data: response.data,
          msg: '登录成功'
        }
      }

      // Success
      if (response.data && response.data.code === 200) {
        return response.data
      }

      // Error
      if (response.data && response.data.code === 201) {
        return Promise.reject(response.data)
      } else if (response.data && response.data.code === 403) {
        // Auth fail
        return Promise.reject(response.data)
      } else {
        // Unknown
        return Promise.reject(response.data)
      }
    },

    function(error) {
      // 未知错误
      if (error.response && error.response.status) {
        if (error.response.status > 200 && error.response.status < 500) {
          return Promise.reject(error.response.data)
        } else {
          return Promise.reject({
            code: 500,
            msg: '服务器异常，请稍后再试',
            data: null
          })
        }
      } else {
        return Promise.reject(error)
      }
    }
  )
  return Http
}
