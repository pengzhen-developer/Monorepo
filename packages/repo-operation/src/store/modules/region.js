export default {
  state: {
    region: []
  },
  mutations: {
    setRegion(state, region) {
      state.region = region
    }
  },
  actions: {
    getRegion({ commit }) {
      if (Peace.cache.sessionStorage.get('region')) {
        // 如果存在使用缓存的 Region
        const region = JSON.parse(Peace.cache.sessionStorage.get('region'))
        commit('setRegion', region)
        return Promise.resolve(region)
      } else {
        const servicePath = process.env.VUE_APP_API_BASE + 'nethospital/operate/hospital/areaList'
        return Peace.http.get(servicePath).then((res) => {
          const region = res.data
          Peace.cache.sessionStorage.set('region', JSON.stringify(region))
          commit('setRegion', region)
          return region
        })
      }
    }
  }
}
