export default {
  // 处方状态
  ENUM_PRESCRIPTION_STATUS: [
    { value: 0, label: '已预审' },
    { value: 1, label: '待审核' },
    { value: 2, label: '质疑中' },
    { value: 3, label: '未通过' },
    { value: 4, label: '已作废' },
    { value: 5, label: '已通过' }
  ],
  // 处方购药状态
  ENUM_PRESCRIPTION_DRUG_STATUS: [
    { value: 1, label: '待购药' },
    { value: 2, label: '已下单' },
    { value: 3, label: '已购药' },
    { value: 4, label: '已失效' }
  ]
}
