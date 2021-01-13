export default {
  /**
   * 禁用状态字典
   */
  ENUM_IS_OPEN: {
    已启用: 1,
    已禁用: 2
  },

  /**
   * 机构类型字典
   */
  ENUM_ORGANIZATION_TYPE: {
    医疗机构: 1,
    店配机构: 2,
    仓配机构: 3
  },

  /**
   * 机构服务类型字典
   */
  ENUM_ORGANIZATION_SERVICE: {
    互联网云医院: 1,
    合理用药管理: 2,
    处方共享服务: 3,
    药品供应服务: 4
  },

  /**
   * 机构入驻方式字典
   */
  ENUM_ORGANIZATION_SOURCE: {
    机构注册: 1,
    运营添加: 2,
    系统同步: 3
  },

  /**
   * 医院属性字典
   */
  ENUM_HOSPITAL_LABEL: {
    公立医院: 0,
    私立医院: 1
  },

  /**
   * 医院类型字典
   */
  ENUM_HOSPITAL_TYPE_LABEL: {
    综合医院: 0,
    儿童医院: 1,
    传染病医院: 2,
    口腔医院: 3,
    妇产医院: 4,
    骨伤医院: 5,
    肿瘤医院: 6,
    血管瘤医院: 7,
    心血管病医院: 8
  },

  /**
   * 医院等级字典
   */
  ENUM_HOSPITAL_LEVEL: {
    '三级特(甲)': 1,
    三级甲等: 2,
    三级乙等: 3,
    三级丙等: 4,
    二级甲等: 5,
    二级乙等: 6,
    二级丙等: 7,
    一级甲等: 8,
    一级乙等: 9,
    一级丙等: 10,
    其他: 11
  },

  /**
   * 商保配置
   */
  ENUM_COMMERICAL_CONFIG: {
    '犇思（药事联）': '1',
    珮文: '2'
  },

  /**
   * 医保配置
   */
  ENUM_MEDICAL_CONFIG: {
    统筹医保: '1',
    个人医保: '2'
  }
}
