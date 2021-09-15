export default {
  // 流转状态
  ENUM_REFERRAL_STATUS: [
    { value: 1, label: '转出待审核' },
    { value: 2, label: '转出已拒绝' },
    { value: 3, label: '转入待审核' },
    { value: 4, label: '转入已同意' },
    { value: 5, label: '转入已拒绝' },
    { value: 6, label: '转诊已完成' },
    { value: 7, label: '转诊已关闭' }
  ]
}
