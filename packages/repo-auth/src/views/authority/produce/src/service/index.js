import Util from '@src/util'
export default {
  /**
   * 终端模块
   */
  client() {
    return {
      //获取终端列表-侧边栏
      getList(params) {
        let apiPath = 'admin/client/list'
        apiPath = Util.service.RSETfulFormat(apiPath, params)
        const serverPath = process.env.VUE_APP_API_BASE
        let requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },

  // menu() {
  // params => { id: 1, name: 2 }
  // requestApi => admin/product/1/2
  // params => { name: 2, title: 3 }
  // requestApi => admin/product/1/2?id=1&name=2title=3
  // let apiPath = `admin/product/{id}/{name}`
  // return {
  //   get(params) {
  //     requestApi = Util.service.RSETfulFormat(apiPath, params, repeat = "true")
  //     return Peace.http.get(requestApi, { params })
  //   },
  //   post(params) {
  //     requestApi = Util.service.RSETfulFormat(apiPath, params)
  //     return Peace.http.post(requestApi, params)
  //   },
  //   list(params) {
  //     apiPath = `admin/product/list/{id}/{name}`
  //     requestApi = Util.service.RSETfulFormat(apiPath, params)
  //     return Peace.http.get(requestApi, params)
  //   },
  // }
  // },

  /**
   * 产品管理模块
   */

  product() {
    let apiPath = `admin/product`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //获取终端byID
      get(params) {
        apiPath = `admin/product/{productId}`
        apiPath = Util.service.RSETfulFormat(apiPath, params)
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加
      post(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑
      put(params) {
        return Peace.http.put(requestApi, params)
      },
      //删除
      delete(params) {
        apiPath = `admin/product/{productId}`
        apiPath = Util.service.RSETfulFormat(apiPath, params)
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //获取产品字典列表
      getDict() {
        apiPath = `admin/product/dict`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //获取终端列表
      getList(params) {
        apiPath = `admin/product/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
