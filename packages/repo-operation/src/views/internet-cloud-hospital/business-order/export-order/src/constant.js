export default {
  //支付方式

  PAYMENT_STATUS: [
    { value: 'wxpay', label: '微信支付' },
    { value: 'shangbaopay', label: '商保支付' },
    { value: 'yibaopay', label: '医保支付' },
    { value: 'deliverypay', label: '货到付款' },
    { value: 'shoppay', label: '到店支付' }
  ],
  // 筛选问诊类型 - 咨询订单
  ORDER_INQUIRY_TYPE: [
    { value: 'image', label: '图文' },
    { value: 'video', label: '视频' }
  ],
  // 咨询、复诊订单的支付状态
  OEDER_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '未支付' },
    { value: 3, label: '已付款' },
    { value: 4, label: '退款中' },
    { value: 5, label: '已退款' }
  ],
  // 购药订单状态
  PURCHASE_ORDER_STATUS: [
    { value: 0, label: '待支付' },
    { value: 1, label: '已下单' },
    { value: 2, label: '已接单' },
    { value: 3, label: '已备药/已发货' },
    { value: 4, label: '已自提/已签收' },
    { value: 5, label: '已取消' },
    { value: 6, label: '已完成' }
  ],
  // 复诊订单的订单状态
  RETURN_VISIT_STATUS: [
    { value: 1, label: '待支付' },
    { value: 7, label: '预约成功' },
    { value: 8, label: '预约关闭' },
    { value: 2, label: '待接诊' },
    { value: 3, label: '已接诊' },
    { value: 4, label: '已退诊' },
    { value: 5, label: '已完成' },
    { value: 6, label: '已取消' }
  ],
  // 咨询订单的订单状态
  INQUIRY_STATUS: [
    { value: 1, label: '待支付' },
    { value: 2, label: '待接诊' },
    { value: 3, label: '已接诊' },
    { value: 4, label: '已退诊' },
    { value: 5, label: '已完成' },
    { value: 6, label: '已取消' }
  ]
}
