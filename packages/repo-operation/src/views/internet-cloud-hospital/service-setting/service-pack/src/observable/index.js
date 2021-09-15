import Vue from 'vue'

const constants = {
  view: {
    /** 列表视图 */
    LIST: 'LIST',
    /** 新增视图 */
    ADD: 'ADD',
    /** 编辑视图 */
    EDIT: 'EDIT',
    /** 详情视图 */
    DETAIL: 'DETAIL'
  }
}

const state = Vue.observable({
  view: constants.view.LIST,

  props: {}
})

const mutations = {
  /**
   * 改变视图状态
   *
   * @param {*} view 参考 constants.view
   */
  changeView(view) {
    state.view = view
  },

  /**
   * 设置 props 属性
   *
   * @param {*} props
   */
  setProps(props) {
    state.props = props
  }
}

export default {
  constants,
  state,
  mutations
}
