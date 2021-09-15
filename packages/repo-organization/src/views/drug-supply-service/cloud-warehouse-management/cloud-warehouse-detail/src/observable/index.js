import Vue from 'vue'

const constants = {
  view: {
    /** 列表视图 */
    LIST: 'LIST',
    /** 机构视图 */
    ORGAN: 'ORGAN',
    /** 运营视图 */
    OPERATE: 'OPERATE',
    /** 商品视图 */
    GOODS: 'GOODS'
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
