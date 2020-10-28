// import LibraryUtil from '@src/util'
import Axios from 'axios'

Axios.defaults.headers.post['Content-Type'] = 'application/json'

let Http = Axios.create({})

// Request interceptor
Http.interceptors.request.use(
  async (config) => {
    // Set Authority
    let userInfo = await Peace.identity.auth.getAuth()
    if (userInfo?.access_token) {
      config.headers.Authorization = 'Bearer ' + userInfo?.access_token
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
Http.interceptors.response.use(
  function(response) {
    if (response?.data?.code === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },

  function(error) {
    return Promise.reject(error)
  }
)

export default Http
