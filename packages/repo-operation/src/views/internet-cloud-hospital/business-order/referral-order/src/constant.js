export default {
  // 筛选问诊类型
  ORDER_INQUIRY_TYPE: [
    { value: 'image', label: '图文' },
    { value: 'video', label: '视频' },
    { value: 'returnVisit', label: '复诊续方' }
  ],
  // 流转状态
  REFERRAL_STATUS: [
    { value: 1, label: '转出待审核' },
    { value: 2, label: '转出已拒绝' },
    { value: 3, label: '转入待审核' },
    { value: 4, label: '准予转入' },
    { value: 5, label: '转入已拒绝' },
    { value: 6, label: '转诊完成' },
    { value: 7, label: '转诊已关闭' }
  ]
}
