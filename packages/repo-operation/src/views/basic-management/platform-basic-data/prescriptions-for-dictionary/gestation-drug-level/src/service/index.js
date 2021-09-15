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

  platformUseDrugRoute: {
    listRoute(params) {
      const isMock = false

      const apiPath = 'platformUseDrugRoute/listRoute'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    }
  },

  listGestationalInfoEnum: {
    GET(params) {
      const isMock = false

      const apiPath = 'listGestationalInfoEnum'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    }
  },

  platformGestational: {
    page(params) {
      const isMock = false

      const apiPath = 'platformGestational/page'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    GET(params) {
      const isMock = false

      const apiPath = 'platformGestational'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    },

    POST(params) {
      const isMock = false

      const apiPath = 'platformGestational'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    PUT(params) {
      const isMock = false

      const apiPath = 'platformGestational'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.put(requestApi, params).then((res) => {
        return res
      })
    }
  }
}
