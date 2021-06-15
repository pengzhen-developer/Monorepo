// 流转状态
const ReferralStatus = [
  { value: 1, label: '转出待审核' },
  { value: 2, label: '转出已拒绝' },
  { value: 3, label: '转入待审核' },
  { value: 4, label: '准予转入' },
  { value: 5, label: '转入已拒绝' },
  { value: 6, label: '转诊已完成' },
  { value: 7, label: '转诊已关闭' }
]

const ReferralStatusTextBorderColor = [
  { value: 1, label: '#FA8C16' },
  { value: 2, label: '#FF3B30' },
  { value: 3, label: '#FA8C16' },
  { value: 4, label: '#00C6AE' },
  { value: 5, label: '#FF3B30' },
  { value: 6, label: '#999999' },
  { value: 7, label: '#999999' }
]

const ReferralStatusBgColor = [
  { value: 1, label: '#FEFCEB' },
  { value: 2, label: '#FFFFFF' },
  { value: 3, label: '#FEFCEB' },
  { value: 4, label: '#E5F9F6' },
  { value: 5, label: '#FFFFFF' },
  { value: 6, label: '#FFFFFF' },
  { value: 7, label: '#FFFFFF' }
]

// 会诊状态
const ConsultationStatus = [
  { value: 1, label: '发起待审核' },
  { value: 2, label: '发起已拒绝' },
  { value: 3, label: '邀请待审核' },
  { value: 4, label: '邀请已拒绝' },
  { value: 5, label: '等待会诊' },
  { value: 6, label: '会诊中' },
  { value: 7, label: '会诊已完成' },
  { value: 8, label: '会诊已关闭' },
  { value: 9, label: '医生待接诊' },
  { value: 10, label: '医生已退诊' }
]

const ConsultStatusTextBorderColor = [
  { value: 1, label: '#FA8C16' },
  { value: 2, label: '#FF3B30' },
  { value: 3, label: '#FA8C16' },
  { value: 4, label: '#FF3B30' },
  { value: 5, label: '#4A83F7' },
  { value: 6, label: '#00C6AE' },
  { value: 7, label: '#999999' },
  { value: 8, label: '#999999' },
  { value: 9, label: '#FA8C16' },
  { value: 10, label: '#FF3B30' }
]

const ConsultStatusBgColor = [
  { value: 1, label: '#FEFCEB' },
  { value: 2, label: '#FFFFFF' },
  { value: 3, label: '#FEFCEB' },
  { value: 4, label: '#FFFFFF' },
  { value: 5, label: '#ECF2FE' },
  { value: 6, label: '#E5F9F6' },
  { value: 7, label: '#FFFFFF' },
  { value: 8, label: '#FFFFFF' },
  { value: 9, label: '#FEFCEB' },
  { value: 10, label: '#FFFFFF' }
]

export { ReferralStatus, ReferralStatusTextBorderColor, ReferralStatusBgColor, ConsultationStatus, ConsultStatusTextBorderColor, ConsultStatusBgColor }

export default {
  ReferralStatus,
  ReferralStatusTextBorderColor,
  ReferralStatusBgColor,
  ConsultationStatus,
  ConsultStatusTextBorderColor,
  ConsultStatusBgColor
}
