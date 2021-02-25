export default {
  //支付方式
  PAYMENT_STATUS: [
    { value: 'wxpay', label: '微信支付' },
    { value: 'shangbaopay', label: '商保支付' },
    { value: 'yibaopay', label: '医保支付' },
    { value: 'deliverypay', label: '货到付款' },
    { value: 'shoppay', label: '到店支付' }
  ],
  //支付模式
  PAY_MODE_STATUS: [
    { value: 1, label: '在线支付' },
    { value: 2, label: '到店支付' },
    { value: 3, label: '货到付款' }
  ],
  // 订单渠道 - 咨询订单
  OREDER_CHANNEL: [
    { value: 'platform', label: '互联网医院' },
    { value: 'yl', label: '养老平台' }
  ],

  // 购药订单的支付状态
  ORDER_PAY_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '未支付' },
    { value: 3, label: '已付款' },
    { value: 4, label: '退款中' },
    { value: 5, label: '已退款' }
  ]
}
