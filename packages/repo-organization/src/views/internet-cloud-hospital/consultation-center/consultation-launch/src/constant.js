export default {
  // 会诊状态
  ENUM_CONSULT_STATUS: [
    { value: 1, label: '发起待审核' },
    { value: 2, label: '发起已拒绝' },
    { value: 3, label: '邀请待审核' },
    { value: 4, label: '邀请已拒绝' },
    { value: 5, label: '等待会诊' },
    { value: 6, label: '会诊中' },
    { value: 7, label: '会诊已完成' },
    { value: 8, label: '会诊已关闭' },
    { value: 9, label: '医生待审核' },
    { value: 10, label: '医生已退诊' }
  ],
  // 审核状态
  ENUM_CHECK_STATUS: [
    { value: 1, label: '未审核' },
    { value: 2, label: '已拒绝' },
    { value: 3, label: '已通过' }
  ]
}
