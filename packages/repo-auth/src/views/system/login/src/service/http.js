import Axios from 'axios'
import Peace from '@src/library'

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
      return response.data
    } else {
      Peace.util.warning(response.data.msg)
      return Promise.reject(response)
    }
  },

  function(error) {
    Peace.util.error('网络请求错误')
    return Promise.reject(error)
  }
)

export default Http
