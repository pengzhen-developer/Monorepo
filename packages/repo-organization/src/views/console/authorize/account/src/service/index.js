import Peace from '@src/library'

export default {
  /**
   * 获取账号列表
   *
   * @param {*} params
   */
  getAccountList(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      res.data.list = [
        {
          id: 1,
          account: 'qwer123456',
          password: '123456',
          name: '李新元',
          role: '开发者',
          status: 1,
          createTime: '2020-09-15 12:00:00'
        },
        {
          id: 2,
          account: 'qwer123456',
          password: '123456',
          name: '李新元',
          role: '开发者',
          status: 1,
          createTime: '2020-09-15 12:00:00'
        },
        {
          id: 3,
          account: 'qwer123456',
          password: '123456',
          name: '李新元',
          role: '开发者',
          status: 1,
          createTime: '2020-09-15 12:00:00'
        }
      ]
      return res
    })
  },
  /**
   * 获取账号信息
   *
   * @param {*} params
   */
  getAccountInfo(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      res.data = {
        id: 1,
        account: 'qwer123456',
        password: '123456',
        name: '李新元',
        role: '开发者',
        status: 1,
        createTime: '2020-09-15 12:00:00'
      }
      return res
    })
  },
  /**
   * 新增
   *
   * @param {*} params
   */
  addAccount(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 修改
   *
   * @param {*} params
   */
  editAccount(params) {
    const isMock = false

    const apiPath = 'console/Service/getMyServiceList'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
