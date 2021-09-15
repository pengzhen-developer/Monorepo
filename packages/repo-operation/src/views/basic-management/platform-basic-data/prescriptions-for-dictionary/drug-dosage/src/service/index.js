export default {
  platformDosageForm: {
    page(params) {
      const isMock = false

      const apiPath = 'platformDosageForm/page'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.post(requestApi, params).then((res) => {
        return res
      })
    },

    GET(params) {
      const isMock = false

      const apiPath = 'platformDosageForm'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.get(requestApi, { params }).then((res) => {
        return res
      })
    },

    PUT(params) {
      const isMock = false

      const apiPath = 'platformDosageForm'
      const mockPath = process.env.VUE_APP_API_MOCK + apiPath
      const serverPath = process.env.VUE_APP_API_IDIC + apiPath

      const requestApi = isMock ? mockPath : serverPath

      return Peace.http.put(requestApi, params).then((res) => {
        return res
      })
    }
  }
}
