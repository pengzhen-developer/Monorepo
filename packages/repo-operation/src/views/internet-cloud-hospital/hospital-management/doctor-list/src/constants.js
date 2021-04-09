export default {
  /**
   * 审核状态
   */
  PASS_STATUS: [
    { value: 'on', label: '已通过' },
    { value: 'off', label: '已拒绝' },
    { value: 'wait', label: '待审核' }
  ],
  /**
   * 医生状态
   */
  DOCTOR_STATUS: [
    { value: 0, label: '停用' },
    { value: 1, label: '在用' }
  ],
  /**
   * 医生来源
   */
  DOCTOR_SOURCE: [
    { value: 1, label: '导入' },
    { value: 2, label: '注册' }
  ],
  /**
   * 医生学历
   */
  EDU_BACKGROUND: [
    { value: 1, label: '高中中专及以下' },
    { value: 2, label: '大专' },
    { value: 3, label: '本科' },
    { value: 4, label: '硕士' },
    { value: 5, label: '博士' }
  ]
}
