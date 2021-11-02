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
  // 复诊状态
  ENUM_RETURN_VISIT_STATUS: [
    { value: 1, label: '待支付' },
    { value: 7, label: '预约成功' },
    { value: 8, label: '预约关闭' },
    { value: 2, label: '待接诊' },
    { value: 3, label: '已接诊' },
    { value: 4, label: '已退诊' },
    { value: 5, label: '已完成' },
    { value: 6, label: '已取消' }
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
