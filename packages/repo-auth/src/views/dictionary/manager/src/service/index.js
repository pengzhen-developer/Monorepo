export default {
  /**
   * 字典
   */
  dict() {
    let apiPath = `admin/dict`
    const serverPath = process.env.VUE_APP_API_BASE
    let requestApi = serverPath + apiPath
    return {
      //获取字典类型byID
      getType(params) {
        apiPath = `admin/dict/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加类型
      addType(params) {
        return Peace.http.post(requestApi, params)
      },
      //编辑类型
      editType(params) {
        return Peace.http.put(requestApi, params)
      },
      //删除类型
      deleteType(params) {
        apiPath = `admin/dict/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //分页查询字典信息
      pageType(params) {
        apiPath = `admin/dict/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      //获取字典项byID
      getItem(params) {
        apiPath = `admin/dict/item/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi)
      },
      //添加字典项
      addItem(params) {
        apiPath = `admin/dict/item`
        requestApi = serverPath + apiPath
        return Peace.http.post(requestApi, params)
      },
      //编辑字典项
      editItem(params) {
        apiPath = `admin/dict/item`
        requestApi = serverPath + apiPath
        return Peace.http.put(requestApi, params)
      },
      //删除字典项
      deleteItem(params) {
        apiPath = `admin/dict/item/${params.id}`
        requestApi = serverPath + apiPath
        return Peace.http.delete(requestApi)
      },
      //分页查询字典项
      pageItem(params) {
        apiPath = `admin/dict/item/page`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      },
      //通过字典类型查找字典
      type(params) {
        apiPath = `admin/dict/type`
        requestApi = serverPath + apiPath
        return Peace.http.get(requestApi, { params })
      }
    }
  }
}
