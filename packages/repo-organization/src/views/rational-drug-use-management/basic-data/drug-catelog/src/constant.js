export default {
  ENUM_CIRCULATE: [
    { value: '-1', label: '全部' },
    { value: '0', label: '院内药品' },
    { value: '1', label: '外流药品' }
  ],
  ENUM_CIRCULATE2: [
    { value: '0', label: '院内药品' },
    { value: '1', label: '外流药品' }
  ],

  ENUM_MATCH_CODE: [
    { value: '', label: '全部' },
    { value: '0', label: '尚未配码' },
    { value: '10', label: '配码失败' },
    { value: '20', label: '配码成功' }
  ],

  ENUM_REVIEW_STATUS: [
    { value: '', label: '全部' },
    { value: '0', label: '待审核' },
    { value: '10', label: '已驳回' },
    { value: '20', label: '已通过' },
    { value: '30', label: '待维护' }
  ]
}
