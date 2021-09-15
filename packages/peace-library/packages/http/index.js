/*
 * @Date: 2017-12-21 18:55:33
 * @Description: axios 拦截器, 集成 download and retry
 */

import Axios from 'axios'
import download from './download'
import { requestInterceptor, responseInterceptor } from './interceptors'

const createHttp = ({ options }) => {
  // get interceptor
  let _requestInterceptor = options.http.interceptors.requestInterceptor || requestInterceptor
  let _responseInterceptor = options.http.interceptors.responseInterceptor || responseInterceptor

  // use interceptor
  Axios.interceptors.request.use(_requestInterceptor.then, _requestInterceptor.catch)
  Axios.interceptors.response.use(_responseInterceptor.then, _responseInterceptor.catch)

  // use download
  Axios.download = download

  return {
    http: Axios
  }
}

export default createHttp
