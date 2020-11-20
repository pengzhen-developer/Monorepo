export default {
  /**
   * 系统审核结果类型
   */
  SYSTEM_AUDIT_RESULTS_TYPE: {
    全部: '',
    通过: 'OK',
    禁用: 'D',
    慎用: 'R',
    提示: 'I'
  },
  /**
   * 系统审核结果类型-map
   */
  SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP: [
    { label: '通过', value: 'OK', color: 'rgb(25, 190, 107)' },
    { label: '禁用', value: 'D', color: 'rgb(237, 64, 20)' },
    { label: '慎用', value: 'R', color: 'rgb(240, 152, 21)' },
    { label: '提示', value: 'I', color: 'rgb(45, 183, 245)' }
  ],
  /**
   * 处方状态
   */
  PRESCRIPTION_STATUS: {
    全部: '',
    已预审: 0,
    待审核: 1,
    质疑中: 2,
    未通过: 3,
    已作废: 4,
    已通过: 5
  },

  /**
   * 审核模式
   */
  AUDIT_MODE_TYPE: {
    全部: '',
    未审核: 0,
    直接通过: 1,
    人工审核: 2,
    超时通过: 3,
    系统通过: 4
  },

  /**
   * 处方来源
   */
  SOURCES_PRESCRIPTION_TYPE: {
    不限: -1,
    门诊: 0,
    急诊: 1,
    住院: 2,
    互联网: 3
  },

  /**
   * 提交方式
   */
  SUBMISSION_TYPE: {
    全部: '',
    提交: 1,
    双签提交: 2
  },

  /**
   * 药师审核结果
   */
  RESULTS_AUDIT_PHARMACIST_TYPE: {
    全部: 0,
    质疑: 1,
    通过: 2,
    未通过: 3
  },
  /**
   * 药师审核结果-map
   */
  RESULTS_AUDIT_PHARMACIST_DETAIL_TYPE_MAP: [
    { label: '质疑', value: 2 },
    { label: '通过', value: 5 },
    { label: '未通过', value: 3 }
  ],

  /**
   * 处方类型
   */
  PRESCRIPTION_TYPE: {
    全部: -1,
    门诊处方: 0,
    急诊处方: 1,
    临时医嘱: 2,
    长期医嘱: 3,
    其它: 4
  },
  /**
   * 系统审核结果背景色-map
   */
  ADIUT_THEME_MAP: {
    ['OK']: 'green',
    ['I']: 'info',
    ['R']: 'warning',
    ['D']: 'negative'
  }
}
