export default {
  // 问诊类型
  InquiryType: [
    { value: 'image', label: '图文' },
    { value: 'video', label: '视频' },
    { value: 'returnVisit', label: '复诊续方' }
  ],
  // 筛选问诊类型 - 咨询订单
  OrderInquiryType: [
    { value: 'image', label: '图文' },
    { value: 'video', label: '视频' }
  ],
  // 咨询、复诊订单的支付状态
  OrderStatus: [
    { value: 1, label: '待支付' },
    { value: 2, label: '未支付' },
    { value: 3, label: '已付款' },
    { value: 4, label: '退款中' },
    { value: 5, label: '已退款' }
  ]
}
