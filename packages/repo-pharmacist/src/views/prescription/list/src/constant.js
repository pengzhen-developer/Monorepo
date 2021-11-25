export default {
  /**
   * 系统审核结果类型
   */
  SYSTEM_AUDIT_RESULTS_TYPE: [
    { label: '通过', value: 'OK' },
    { label: '禁用', value: 'D' },
    { label: '慎用', value: 'R' },
    { label: '提示', value: 'I' },
    { label: '暂无结果', value: 'FAIL' },
    { label: '暂无结果', value: 'ERR' },
    { label: '服务调用失败', value: 'SERVER_ERR' }
  ],
  PRESCRIPTION_EXAM_RESULTS_TYPE: [
    { label: '', value: 0 },
    { label: '质疑', value: 1 },
    { label: '通过', value: 2 },
    { label: '未通过', value: 3 }
  ]
}
