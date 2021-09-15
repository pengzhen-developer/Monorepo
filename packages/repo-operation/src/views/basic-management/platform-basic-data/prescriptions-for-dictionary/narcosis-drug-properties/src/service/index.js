export default {
  platformDrugBaseInfo: {
    listDrugAttrEnum(params) {
      const isMock = false

      const apiPath = 'platformDrugBaseInfo/listDrugAttrEnum'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    },

    pageAnaesthesiaAndSpirit(params) {
      const isMock = false

      const apiPath = 'platformDrugBaseInfo/pageAnaesthesiaAndSpirit'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    updatePlatformDrugExtInfo(params) {
      const isMock = false

      const apiPath = 'platformDrugBaseInfo/updatePlatformDrugExtInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.put(requestApi, params).then((res) => {
        return res
      })
    },

    getBaseAndExtInfoById(params) {
      const isMock = false

      const apiPath = 'platformDrugBaseInfo/getBaseAndExtInfoById'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    }
  }
}
