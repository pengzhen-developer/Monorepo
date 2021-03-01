export default {
  // 支付方式
  ENUM_PAYMENT: [
    { value: 'wxpay', label: '微信支付' },
    { value: 'shangbaopay', label: '商保支付' },
    { value: 'yibaopay', label: '医保支付' },
    { value: 'deliverypay', label: '货到付款' },
    { value: 'shoppay', label: '到店支付' }
  ],
  // 订单支付状态
  ENUM_ORDER_PAY_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '未支付' },
    { value: 3, label: '已付款' },
    { value: 4, label: '退款中' },
    { value: 5, label: '已退款' }
  ],
  // 支付模式
  ENUM_PAYMODE: [
    { value: 1, label: '在线支付' },
    { value: 2, label: '到店支付' },
    { value: 3, label: '货到付款' }
  ]
}
