export default {
  /**
   * 系统审核结果类型
   */
  SYSTEM_AUDIT_RESULTS_TYPE: {
    全部: '',
    通过: 'OK',
    禁用: 'D',
    慎用: 'R',
    提示: 'I',
    转码失败: 'FAIL'
  },
  /**
   * 系统审核结果类型-map
   */
  SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP: [
    { label: '通过', value: 'OK', color: '#3099A6' },
    { label: '禁用', value: 'D', color: '#C40202' },
    { label: '慎用', value: 'R', color: '#F09815' },
    { label: '提示', value: 'I', color: '#3099A6' },
    { label: '服务调用失败', value: 'SERVER_ERR', color: '#C40202' },
    { label: '审方失败', value: 'FAIL', color: '#C40202' }
  ],

  /**
   * 审方记录
   */
  PRESCRIPTION_CHECK_RESULT: {
    R: {
      label: '慎用',
      color: 'rgba(240, 152, 21, 1)',
      borderColor: 'rgba(240, 152, 21, 1)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    ERR: {
      label: '暂无结果',
      color: 'rgba(51, 51, 51, 0.4)',
      borderColor: 'rgba(51, 51, 51, 0.4)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    OK: {
      label: '通过',
      color: 'rgba(48, 153, 166, 1)',
      borderColor: 'rgba(48, 153, 166, 1)',
      bgColor: 'rgba(48, 153, 166, 0.1)'
    },
    I: {
      label: '提示',
      color: 'rgba(240, 152, 21, 1)',
      borderColor: 'rgba(240, 152, 21, 1)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    D: {
      label: '禁用',
      color: 'rgba(196, 2, 2, 1)',
      borderColor: 'rgba(196, 2, 2, 1)',
      bgColor: 'rgba(196, 2, 2, 0.1)'
    },
    FAIL: {
      label: '审方失败',
      color: 'rgba(196, 2, 2, 1)',
      borderColor: 'rgba(196, 2, 2, 1)',
      bgColor: 'rgba(196, 2, 2, 0.1)'
    },
    SERVER_ERR: {
      label: '服务调用失败',
      color: 'rgba(196, 2, 2, 1)',
      borderColor: 'rgba(196, 2, 2, 1)',
      bgColor: 'rgba(196, 2, 2, 0.1)'
    },
    '1': {
      label: '双签提交',
      color: 'rgba(240, 152, 21, 1)',
      borderColor: 'rgba(240, 152, 21, 1)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    '2': {
      label: '质疑',
      color: 'rgba(196, 2, 2, 1)',
      borderColor: 'rgba(196, 2, 2, 1)',
      bgColor: 'rgba(196, 2, 2, 0.1)'
    },
    '3': {
      label: '未通过',
      color: 'rgba(240, 152, 21, 1)',
      borderColor: 'rgba(240, 152, 21, 1)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    '4': {
      label: '已作废',
      color: 'rgba(51, 51, 51, 0.2)',
      borderColor: 'rgba(51, 51, 51, 0.6)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    },
    '5': {
      label: '通过',
      color: 'rgba(48, 153, 166, 1)',
      borderColor: 'rgba(48, 153, 166, 1)',
      bgColor: 'rgba(48, 153, 166, 0.1)'
    },
    '9': {
      label: '已失效',
      color: 'rgba(51, 51, 51, 0.2)',
      borderColor: 'rgba(51, 51, 51, 0.6)',
      bgColor: 'rgba(240, 152, 21, 0.1)'
    }
  },

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
    ['D']: 'negative',
    ['ERR']: 'grey'
  }
}
