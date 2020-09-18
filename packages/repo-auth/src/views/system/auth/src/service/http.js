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
    console.log(error)
    return Promise.reject({
      code: 500,
      data: error,
      msg: '网络请求错误'
    })
  }
)

export default Http
