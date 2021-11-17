import Vue from 'vue'

const constants = {
  view: {
    /** 无数据空态页视图 */
    NODATA: 'NODATA',

    /** 药师工作状态视图 */
    STATUS: 'STATUS',

    /** 药师医网信签名设置视图 */
    SIGNSTATUS: 'SIGNSTATUS',

    /** 审方详情视图 */
    DETAIL: 'DETAIL'
  }
}

const state = Vue.observable({
  view: undefined
})

const mutations = {
  /**
   * 改变视图状态
   *
   * @param {*} view 参考 constants.view
   */
  changeView(view) {
    state.view = view
    console.log('ewqeqwe', state.view)
  }
}

export default {
  constants,
  state,
  mutations
}
