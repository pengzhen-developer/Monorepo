/** 规则模型*/
export default class RuleModel {

  /** 规则名称 */
  ruleName = ''

  /** 规则状态 */
  ruleState = ''

  /** 提示级别Code */
  warningLevel = ''

  /** 提示说明 */
  description = ''

  ruleInfo = undefined

  /** 适应症规则 */
  DiagnosisRuleItem = undefined

  /** 剂量范围规则 */
  DosageRule = undefined

  /** 前置规则*/
  conditionExpressionString = new ConditionExpression()

  /**
   *
   * @param ruleName 规则名称
   * @param ruleStatus 规则状态
   * @param warningLevel 提示级别Code
   * @param description 提示说明
   * @param conditionExpressionString 前置条件
   */
  constructor({
                ruleName = '',
                ruleStatus = '',
                warningLevel = '',
                description = '',
                conditionExpressionString = undefined,
                ruleInfo= undefined
              } = {
    ruleName: undefined,
    ruleStatus: undefined,
    warningLevel: undefined,
    description: undefined,
    conditionExpressionString: undefined,
    ruleInfo: undefined
  }) {
    this.ruleName = ruleName
    this.ruleStatus = ruleStatus
    this.warningLevel = warningLevel
    this.description = description
    if (conditionExpressionString && (conditionExpressionString instanceof ConditionExpression)) {
      this.conditionExpressionString = conditionExpressionString
    } else {
      this.conditionExpressionString = new ConditionExpression()
    }

    switch (this.ruleName) {
      case '适应症':
        this.DiagnosisRuleItem = new DiagnosisRuleModel(ruleInfo)
        break
      case '剂量范围':
        this.DosageRule = new DosageRuleModel(ruleInfo)
        break
    }

  }

  /**
   * 验证结果
   * @returns {boolean}
   */
  verificationResults() {
    return Peace.validate.isEmpty(this.warningLevel) || Peace.validate.isEmpty(this.description)
  }
}

/** 前置条件*/
// eslint-disable-next-line no-unused-vars
class ConditionExpression {
  /** 适应症前置条件*/
  Indication = new IndicationModel()
  /** 年龄前置条件*/
  Age = new AgeModel()
  /** 人群前置条件*/
  HumanClassify = new HumanClassifyModel()
  /** 体重范围前置条件*/
  Weight = new WeightModel()
  /** 体重大小前置条件*/
  WeightSize = new WeightSizeModel()
  /**  给药途径前置条件*/
  Route = new RouteModel()

  /**
   *
   * @param Indication  适应症前置条件
   * @param Age 年龄前置条件
   * @param HumanClassify  人群前置条件
   * @param Weight 体重范围前置条件
   * @param WeightSize 体重大小前置条件
   * @param Route 给药途径前置条件
   */
  constructor({
                Indication = undefined,
                Age = undefined,
                HumanClassify = undefined,
                Weight = undefined,
                WeightSize = undefined,
                Route = undefined
              } = {
    Indication: undefined,
    Age: undefined,
    HumanClassify: undefined,
    Weight: undefined,
    WeightSize: undefined,
    Route: undefined
  }) {

    if (Age && (Age instanceof AgeModel)) {
      this.Age = Age
    } else {
      this.Age = new AgeModel()
    }

    if (Weight && (Weight instanceof WeightModel)) {
      this.Weight = Weight
    } else {
      this.Weight = new WeightModel()
    }

    if (WeightSize && (WeightSize instanceof WeightSizeModel)) {
      this.WeightSize = WeightSize
    } else {
      this.WeightSize = new WeightSizeModel()
    }

    if (Indication && (Indication instanceof IndicationModel)) {
      this.Indication = Indication
    } else {
      this.Indication = new IndicationModel()
    }

    if (HumanClassify && (HumanClassify instanceof HumanClassifyModel)) {
      this.HumanClassify = HumanClassify
    } else {
      this.HumanClassify = new HumanClassifyModel()
    }

    if (Route && (Route instanceof RouteModel)) {
      this.Route = Route
    } else {
      this.Route = new RouteModel()
    }
  }

  /**
   * 前置条件验证结果
   * @returns {boolean}
   */
  verificationResults() {
    return this.Age.verificationResults() ||
      this.Weight.verificationResults() ||
      this.WeightSize.verificationResults() ||
      this.Indication.verificationResults() ||
      this.HumanClassify.verificationResults() ||
      this.Route.verificationResults()
  }

  /**
   * 格式化前置条件字符串
   * @returns {string}
   */
  description() {
    let templateString = ''
    if (this.Age.verificationResults()) {
      templateString += this.Age.description()
    }

    if (this.Weight.verificationResults()) {
      templateString += this.Weight.description()
    }

    if (this.WeightSize.verificationResults()) {
      templateString += this.WeightSize.description()
    }

    if (this.Indication.verificationResults()) {
      templateString += this.Indication.description()
    }

    if (this.HumanClassify.verificationResults()) {
      templateString += this.HumanClassify.description()
    }

    if (this.Route.verificationResults()) {
      templateString += this.Route.description()
    }

    return templateString
  }

}

/** 适应症前置条件Model */
class IndicationModel {
  /** 前置类型 */
  ceType = 'Indication'
  /** 适应症列表 */
  listValue = [new DiagnosisRuleModel()]

  /**
   *
   * @param listValue 适应症列表
   */
  constructor({listValue = []} = {listValue: []}) {
    this.listValue = listValue
  }

  /**
   * 适应症的验证结果
   * @returns {boolean}
   */
  verificationResults() {
    return this.listValue && this.listValue.length > 0
  }

  /**
   * 格式化适应症
   * @returns {string}
   */
  description() {
    return `适应症 ${this.listValue.reduce(function (prev, cur) {
      return prev + cur.name + ' '
    }, '')} `
  }
}

/** 适应症前置条件Model */
class AgeModel {
  /** 前置类型 */
  ceType = 'Age'
  /** 人群字典编码 */
  humanCode = ''
  /** 最小年龄 */
  value1 = ''
  /** 最大年龄 */
  value2 = ''
  /** 年龄单位 */
  value3 = ''

  /**
   *
   * @param humanCode 人群字典编码
   * @param value1 最小年龄
   * @param value2 最大年龄
   * @param value3 年龄单位
   */
  constructor({
                humanCode = undefined,
                value1 = undefined,
                value2 = undefined,
                value3 = undefined
              } = {humanCode: undefined, value1: undefined, value2: undefined, value3: undefined}) {
    this.humanCode = humanCode
    this.value1 = value1
    this.value2 = value2
    this.value3 = value3
  }

  /**
   * 年龄条件的验证结果
   * @returns {string}
   */
  verificationResults() {
    return this.humanCode && this.value1 && this.value2 && this.value3
  }

  /**
   * 格式化年龄条件字符串
   * @returns {string}
   */
  description() {
    return `年龄 ${this.humanCode}${this.value1}-${this.value2}${this.value3} `
  }
}

/** 人群前置条件Model */
class HumanClassifyModel {
  /** 前置类型 */
  ceType = 'HumanClassify'
  /** 人群列表 */
  listValue = [
    {
      code: '',
      name: '',
    }
  ]

  /**
   *
   * @param listValue 人群列表
   */
  constructor({listValue = []} = {listValue: []}) {
    this.listValue = listValue
  }

  /**
   * 人群条件的验证结果
   * @returns {boolean}
   */
  verificationResults() {
    return this.listValue && this.listValue.length > 0
  }

  /**
   * 格式化人群条件
   * @returns {string}
   */
  description() {
    return `人群 属于 ${this.listValue.reduce(function (prev, cur) {
      return prev + cur.name + ' '
    }, '')} `
  }
}

/** 体重范围Model */
class WeightModel {
  /** 前置类型 */
  ceType = 'Weight'
  /** 最小体重 */
  value1 = ''
  /** 最大体重 */
  value2 = ''

  /**
   *
   * @param value1 最小体重
   * @param value2 最大体重
   */
  constructor({value1 = undefined, value2 = undefined} = {value1: undefined, value2: undefined}) {
    this.value1 = value1
    this.value2 = value2
  }

  /**
   * 体重范围的验证结果
   * @returns {string}
   */
  verificationResults() {
    return this.value1 && this.value2
  }

  /**
   * 格式化体重条件
   * @returns {string}
   */
  description() {
    return `体重 ${this.value1}-${this.value2}kg `
  }
}

/** 体重大小Model */
class WeightSizeModel {
  /** 前置类型 */
  ceType = 'WeightSize'
  /** 对比值(>、<等) */
  value1 = ''
  /** 体重值 */
  value2 = ''

  /**
   *
   * @param value1 对比值(>、<等)
   * @param value2  体重值
   */
  constructor({value1 = undefined, value2 = undefined} = {value1: undefined, value2: undefined}) {
    this.value1 = value1
    this.value2 = value2
  }

  /**
   * 体重大小的验证结果
   * @returns {string}
   */
  verificationResults() {
    return this.value1 && this.value2
  }

  /**
   * 格式化体重大小条件
   * @returns {string}
   */
  description() {
    return `体重 ${this.value1}${this.value2}kg `
  }
}

/** 给药途径Model */
class RouteModel {
  /** 前置类型 */
  ceType = 'Route'
  /**  */
  contain = ''
  /** 给药途径编码列表 */
  listValue = [
    {
      code: '',
      name: '',
    }
  ]

  /**
   *
   * @param contain 0 属于  1不属于
   * @param listValue 给药途径编码列表
   */
  constructor({contain = undefined, listValue = []} = {contain: undefined, listValue: []}) {
    this.contain = contain
    this.listValue = listValue
  }

  /**
   * 给药途径验证结果
   * @returns {boolean}
   */
  verificationResults() {
    return this.listValue && this.listValue.length > 0
  }

  /**
   * 格式化给药途径条件
   * @returns {string}
   */
  description() {
    return `给药途径 ${this.contain} ${this.listValue.reduce(function (prev, cur) {
      return prev + cur.name + ' '
    }, '')} `
  }
}

/** 适应症模型 */
class DiagnosisRuleModel {
  code = undefined
  name = undefined
  type = undefined

  constructor({code = undefined, name = undefined, type = undefined} = {
    code: undefined,
    name: undefined,
    type: undefined
  }) {
    this.code = code
    this.name = name
    this.type = type
  }
}

/** 剂量范围规则 */
class DosageRuleModel {

  dosagetype = 0
  eachMinDose = undefined
  eachMaxDose = undefined
  dailyMaxDose = undefined
  dailyMinDose = undefined

  constructor({
                dosagetype = 0,
                eachMinDose = undefined,
                eachMaxDose = undefined,
                dailyMaxDose = undefined,
                dailyMinDose = undefined
              } = {
    dosagetype: 0,
    eachMinDose: undefined,
    eachMaxDose: undefined,
    dailyMaxDose: undefined,
    dailyMinDose: undefined
  }) {
    this.dosagetype = dosagetype
    this.eachMinDose = eachMinDose
    this.eachMaxDose = eachMaxDose
    this.dailyMaxDose = dailyMaxDose
    this.dailyMinDose = dailyMinDose
  }
}



