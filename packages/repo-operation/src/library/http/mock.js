/*
 * @Author: PengZhen
 * @Date: 2018-12-21
 * @Description: Download for axios
 */

import axios from 'axios'

/**
 * mock
 *
 * @export
 * @param {string} [url=''] mock url
 * @param {*} [params={}] mock params
 * @param {number} [delay=500] mock delay
 * @returns
 */
export function mock(url = '', params = {}, delay = 500) {
  // Mock 读取的是本地路径，
  // 当处于生产模式时，需要增加虚拟路径
  if (process.env.NODE_ENV === 'production') {
    url = process.env.VUE_APP_RELEASE_FLODER_PATH + url
  }

  params.isMock = true
  params.mockDelay = delay
  params.mockDate = new Date()

  return axios({
    url,
    params
  })
}

export default mock
