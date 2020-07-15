/** 审核状态 */
export const checkStatus = {
  未申请: 1,
  待审核: 2,
  已通过: 3,
  未通过: 4,
}

/** 医院标签 */

export const HospitalLabel = [
  { value: 0, label: '公立医院' },
  { value: 1, label: '私立医院' },
]

/** 医院类型标签 */

export const HospitalTypeLabel = [
  { value: 0, label: '综合医院' },
  { value: 1, label: '儿童医院' },
  { value: 2, label: '传染病医院' },
  { value: 3, label: '口腔医院' },
  { value: 4, label: '妇产医院' },
  { value: 5, label: '骨伤医院' },
  { value: 6, label: '肿瘤医院' },
  { value: 7, label: '血管瘤医院' },
  { value: 8, label: '心血管病医院' },
]

/** 医院等级 */

export const HospitalLevel = [
  { value: 1, label: '三级特(甲)' },
  { value: 2, label: '三级甲等' },
  { value: 3, label: '三级乙等' },
  { value: 4, label: '三级丙等' },
  { value: 5, label: '二级甲等' },
  { value: 6, label: '二级乙等' },
  { value: 7, label: '二级丙等' },
  { value: 8, label: '一级甲等' },
  { value: 9, label: '一级乙等' },
  { value: 10, label: '一级丙等' },
  { value: 11, label: '其他' },
]

export default {
  /** 审核状态 */
  checkStatus,
  HospitalLabel,
  HospitalTypeLabel,
  HospitalLevel,
}
