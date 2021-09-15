export default {
  platformDrugBaseInfo: {
    pageMenstruumProperties(params) {
      const isMock = false

      const apiPath = 'platformDrugBaseInfo/pageMenstruumProperties'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    }
  },

  platformDrugMenstruumDic: {
    relatedPlatformDrugs(params) {
      const isMock = false

      const apiPath = 'platformDrugMenstruumDic/relatedPlatformDrugs'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    pageDrugLists(params) {
      const isMock = false

      const apiPath = 'platformDrugMenstruumDic/pageDrugLists'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    page(params) {
      const isMock = false

      const apiPath = 'platformDrugMenstruumDic/page'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    GET(params) {
      const isMock = false

      const apiPath = 'platformDrugMenstruumDic'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    },

    PUT(params) {
      const isMock = false

      const apiPath = 'platformDrugMenstruumDic'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.put(requestApi, params).then((res) => {
        return res
      })
    }
  }
}
