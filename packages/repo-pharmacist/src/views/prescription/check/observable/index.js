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
  forceUpdate: false,

  view: undefined,
  jztClaimNo: undefined,
  notCheckedCount: 0
})

const mutations = {
  forceUpdate(params) {
    state.forceUpdate = params
  },

  /**
   * 改变视图状态
   *
   * @param {*} view 参考 constants.view
   */
  changeView(view) {
    state.view = view
  },
  /**
   * 改变处方编号
   *
   * @param {*}
   */
  changeJztClaimNo(jztClaimNo) {
    state.jztClaimNo = jztClaimNo
  },
  /**
   * 改变处方总数
   *
   * @param {*}
   */
  changeNotCheckedCount(count) {
    state.notCheckedCount = count
  },
  /**
   * 清空数据
   *
   * @param {*}
   */
  reset() {
    state.forceUpdate = false

    state.view = undefined
    state.jztClaimNo = undefined
    state.notCheckedCount = 0
  }
}

export default {
  constants,
  state,
  mutations
}
