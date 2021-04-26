export default {
  // 退款状态 1：退款中 2：退款异常 3退款成功 4退款关闭
  REFUNDSTATUS: [
    { label: '退款中', value: 1 },
    { label: '退款成功', value: 3 },
    { label: '退款异常', value: 2 },
    { label: '退款关闭', value: 4 }
  ],
  // 退款类型
  REFUNDSOURCE: [
    { label: '系统退款', value: 1 },
    { label: '运营退款', value: 2 }
  ],

  ORDERTYPE: [
    { label: '咨询', value: 1 },
    { label: '复诊', value: 2 },
    { label: '购药', value: 3 },
    { label: '挂号', value: 4 },
    { label: '服务包', value: 5 }
  ]
}
