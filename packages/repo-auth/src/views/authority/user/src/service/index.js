import Peace from '@src/library'

export default {
  /**
   * 终端模块
   */
  client() {
    let apiPath = `admin/client`
    const serverPath = process.env.VUE_APP_AUTH_API
    let requestApi = serverPath + apiPath
    return {
      //获取终端列表-侧边栏
      getList(params) {
        apiPath = `admin/client/list`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  },
  /**
   * product
   */
  product() {
    return {
      //获取产品字典列表
      getDict() {
        let apiPath = `admin/product/dict`
        const serverPath = process.env.VUE_APP_AUTH_API
        let requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      }
    }
  },
  /**
   * 用户管理模块
   */
  user() {
    let apiPath = `admin/user`
    const serverPath = process.env.VUE_APP_AUTH_API
    let requestApi = serverPath + apiPath
    return {
      //通过ID查询用户信息
      get(params) {
        apiPath = `admin/user/${params.id}`
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
        apiPath = `admin/user/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //分页查询用户
      getList(params) {
        apiPath = `admin/user/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
