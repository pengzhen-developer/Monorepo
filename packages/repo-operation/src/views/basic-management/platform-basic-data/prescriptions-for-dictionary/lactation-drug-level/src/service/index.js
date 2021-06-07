export default {
  platformDrugChemicalComposition: {
    listAll(params) {
      const isMock = false

      const apiPath = 'platformDrugChemicalComposition/listAll'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    }
  },

  listLactationInfoEnum: {
    GET(params) {
      const isMock = false

      const apiPath = 'listLactationInfoEnum'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    }
  },

  platformLactationInfo: {
    page(params) {
      const isMock = false

      const apiPath = 'platformLactationInfo/page'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    GET(params) {
      const isMock = false

      const apiPath = 'platformLactationInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    },

    POST(params) {
      const isMock = false

      const apiPath = 'platformLactationInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    PUT(params) {
      const isMock = false

      const apiPath = 'platformLactationInfo'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.put(requestApi, params).then((res) => {
        return res
      })
    }
  }
}
