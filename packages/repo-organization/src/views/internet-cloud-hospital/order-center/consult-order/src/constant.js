export default {
  // 问诊状态
  ENUM_CONSULT_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '待接诊' },
    { value: 3, label: '已接诊' },
    { value: 4, label: '已退诊' },
    { value: 5, label: '已完成' },
    { value: 6, label: '已取消' }
  ],
  // 订单支付状态
  ENUM_ORDER_PAY_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '未支付' },
    { value: 3, label: '已付款' },
    { value: 4, label: '退款中' },
    { value: 5, label: '已退款' }
  ],
  // 问诊类型
  ENUM_INQUIRY_TYPE: [
    { value: 'image', label: '图文' },
    { value: 'video', label: '视频' },
    { value: 'returnVisit', label: '复诊续方' }
  ],
  // 支付方式
  ENUM_PAYMENT: [
    { value: 'wxpay', label: '微信支付' },
    { value: 'shangbaopay', label: '商保支付' },
    { value: 'yibaopay', label: '医保支付' },
    { value: 'deliverypay', label: '货到付款' },
    { value: 'shoppay', label: '到店支付' }
  ]
}
