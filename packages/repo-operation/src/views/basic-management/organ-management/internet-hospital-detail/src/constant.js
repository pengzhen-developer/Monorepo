export default {
  /**
   * 药品来源
   */
  DrugSource: [
    { value: 1, label: '院内目录' },
    { value: 2, label: '外延目录' }
  ],

  /**
   * 药品状态
   */
  DrugStatus: [
    { value: 1, label: '启用' },
    { value: 2, label: '停用' }
  ],

  /**
   * 医保和非医保
   */
  MedicalStatus: [
    { value: 1, label: '医保' },
    { value: 2, label: '非医保' }
  ],

  // 药品类型
  ENUM_DRUG_NATURE: [
    { value: 1, label: '西药' },
    { value: 2, label: '中药' },
    { value: 3, label: '中成药' },
    { value: 4, label: '生物制剂' }
  ],
  // 药品来源
  ENUM_DRUG_SOURCE: [
    { value: 1, label: '院内目录' },
    { value: 2, label: '外延目录' }
  ],
  // 药品状态
  ENUM_DRUG_STATUS: [
    { value: 1, label: '启用' },
    { value: 2, label: '停用' }
  ],
  // 医保目录
  ENUM_MEDICAL_STATUS: [
    { value: 1, label: '医保' },
    { value: 2, label: '非医保' }
  ],
  // 储存条件
  ENUM_DRUG_STORAGE: [
    { value: 1, label: '常温' },
    { value: 2, label: '冷藏' },
    { value: 3, label: '阴凉' }
  ],
  // 是否拆零
  ENUM_DISCONNECT: [
    { value: 'yes', label: '是' },
    { value: 'no', label: '否' }
  ],
  //是否是OTC药品
  ENUM_OTC_DRUG: [
    { value: 1, label: '是' },
    { value: 2, label: '否' }
  ]
}
