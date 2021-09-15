export default {
  /**
   * 机构列表
   */
  getDeptList() {
    const isMock = false

    const apiPath = 'psd/SyncStatus/StatusSyncDict'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi).then((res) => {
      return res
    })
  },

  /**
   * 回调列表
   * @param {CustCode} string 机构编码
   */
  getSyncStatusList(params) {
    const isMock = false

    const apiPath = 'psd/SyncStatus/GetSyncStatusList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 回调数据字典
   * @param {custCode} string 机构编码
   * @param {sysCode} string 系统编码
   */
  getSyncStatusDetailList(params) {
    const isMock = false

    const apiPath = 'psd/SyncStatus/GetStatusSyncListByCustCode'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },

  /**
   * 保存信息
   * @param {CustCode} string 机构编码
   * @param {CustName} string 机构名称
   * @param {SysCode} string 系统编码
   * @param {SysName} string 系统名称
   * @param {statusSyncDtos} Object 数据集
   */
  saveSyncStatus(params) {
    const isMock = false

    const apiPath = 'psd/SyncStatus/SaveStatusSync'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 回调数据字典
   * @param {id} string 主键ID
   */
  deleteSyncStatus(params) {
    const isMock = false

    const apiPath = 'psd/SyncStatus/Delete'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  }
}
