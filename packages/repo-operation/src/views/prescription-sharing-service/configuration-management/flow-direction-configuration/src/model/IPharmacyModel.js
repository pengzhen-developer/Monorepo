/** 流向配置模型  */
export class IPharmacyRuleModel {
  /** 所属规则类型 - 大类 ID */
  RuleFlag = ''
}

/** 分类属性模型 */
export class IPharmacyConfModel {
  /** 所属规则类型 - 小类 ID */
  ConfType = ''
}

/** 药房属性模型 */
export class IPharmacyModel {
  /** 所属规则类型 - 大类 ID */
  RuleFlag = ''
  /** 所属规则类型 - 小类 ID */
  ConfType = ''
  /** 云药房 、 药店 */
  CustomerType = ''
  /** 药店 ID 、仓库 ID */
  DrugStoreId = ''
  /** 显示图片 */
  DisplayImg = process.env.VUE_APP_SITE_OPERATION + 'Images/drug-flow-default.png'
  /** 显示名称 */
  DisplayName = ''
}

export default {
  IPharmacyRuleModel,

  IPharmacyConfModel,

  IPharmacyModel
}
