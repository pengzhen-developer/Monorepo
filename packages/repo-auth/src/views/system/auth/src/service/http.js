import Axios from 'axios'

let Http = Axios.create({})

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
    if (response?.data?.code === 200 || !response.data.code) {
      return {
        code: 200,
        data: response.data,
        msg: '登录成功'
      }
    } else {
      return Promise.reject(response.data)
    }
  },

  function(error) {
    let result = {}
    if (error?.response?.status) {
      if (error.response.status > 200 && error.response.status < 500) {
        result = error.response.data
      } else {
        result = {
          code: 500,
          data: null,
          msg: '服务器异常，请稍后再试'
        }
      }
    }
    return Promise.reject(result)
  }
)

export default Http
