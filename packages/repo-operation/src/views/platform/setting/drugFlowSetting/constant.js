export default {
  /**
   * 视图显示状态
   */
  DISPLAY_VIEW: {
    列表: '列表',
    编辑: '编辑',
    详情: '详情'
  },

  /**
   * 规则列表 - 大类
   */
  RULE_FLAG_MAP: [
    { label: '不限', value: 1 },
    { label: '按品种', value: 2 },
    { label: '按病症', value: 3 }
  ],

  /**
   * 规则列表 - 小类
   */
  CONF_TYPE_MAP: [
    { label: '不限', value: 50 },
    { label: '外延', value: 40 },
    { label: '院内', value: 30 },
    { label: '重症', value: 20 },
    { label: '普通', value: 10 },
    { label: '其它', value: 0 }
  ],

  /**
   * 品种列表
   */
  VARIETY_LIST: {
    院内品种: '院内品种',
    外延品种: '外延品种'
  }
}
