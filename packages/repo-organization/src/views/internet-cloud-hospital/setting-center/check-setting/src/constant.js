export default {
  // 使用状态
  ENUM_ACCOUNT_STATUS: [
    { value: 0, label: '停用' },
    { value: 1, label: '在用' }
  ],
  // 医生来源
  ENUM_DOCTOR_SOURCE: [
    { value: 1, label: '导入' },
    { value: 2, label: '注册' }
  ],
  // 审核状态
  ENUM_PASS_STATUS: [
    { value: 'on', label: '通过' },
    { value: 'off', label: '拒绝' },
    { value: 'wait', label: '等待' }
  ],
  // 学历
  ENUM_EDUCATION: [
    { value: 1, label: '高中中专及以下' },
    { value: 2, label: '大专' },
    { value: 3, label: '本科' },
    { value: 4, label: '硕士' },
    { value: 5, label: '博士' }
  ]
}
