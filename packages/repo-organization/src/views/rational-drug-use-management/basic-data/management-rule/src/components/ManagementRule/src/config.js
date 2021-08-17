export default [
  {
    instance: () => import('./components/用量管理'),
    key: 'drugQuantityLimitRuleList',
    name: '用量管理',
    model: {
      enumType: '1', //类型
      dqlrDoctorLists: [],
      dqlrDrugLists: [],
      operator: '>',
      timePeriod: 'D',
      type: 1,
      ruleState: 1,
      warningLevel: 'D',
      description: ''
    },
    models: [
      {
        enumType: '1', //类型
        dqlrDoctorLists: [],
        dqlrDrugLists: [],
        operator: '>',
        timePeriod: 'D',
        type: 1,
        ruleState: 1,
        warningLevel: 'D',
        description: ''
      }
    ]
  },
  {
    instance: () => import('./components/金额管理'),
    key: 'drugAmountLimitRuleList',
    name: '金额管理',
    model: {
      enumType: '1', //类型
      dalrDoctorLists: [],
      dalrDrugLists: [],
      operator: '>',
      timePeriod: 'D',
      type: 1,
      ruleState: 1,
      warningLevel: 'D',
      description: ''
    },
    models: [
      {
        enumType: '1', //类型
        dalrDoctorLists: [],
        dalrDrugLists: [],
        operator: '>',
        timePeriod: 'D',
        type: 1,
        ruleState: 1,
        warningLevel: 'D',
        description: ''
      }
    ]
  },
  {
    instance: () => import('./components/用药管理'),
    key: 'drugKindLimitRuleList',
    name: '用药管理',
    model: {
      enumType: '1', //类型
      dklrDoctorLists: [],
      dklrDrugLists: [],
      whetherType: 'yes',
      ruleState: 1,
      warningLevel: 'D',
      description: ''
    },
    models: [
      {
        enumType: '1', //类型
        dklrDoctorLists: [],
        dklrDrugLists: [],
        whetherType: 'yes',
        ruleState: 1,
        warningLevel: 'D',
        description: ''
      }
    ]
  },
  {
    instance: () => import('./components/用药时长'),
    key: 'drugKindDurationRuleList',
    name: '用药时长',
    model: {
      prescriptionCode: '0',
      operator: '>',
      quantity: undefined,
      ruleState: 1,
      warningLevel: 'D',
      description: ''
    },
    models: [
      {
        prescriptionCode: '0',
        operator: '>',
        quantity: undefined,
        ruleState: 1,
        warningLevel: 'D',
        description: ''
      }
    ]
  },
  {
    instance: () => import('./components/提前拿药'),
    key: 'drugTakingAdvanceLimitRuleList',
    name: '提前拿药',
    model: {
      prescriptionCode: '0',
      operator: '>',
      quantity: undefined,
      ruleState: 1,
      warningLevel: 'D',
      description: ''
    },
    models: [
      {
        prescriptionCode: '0',
        operator: '>',
        quantity: undefined,
        ruleState: 1,
        warningLevel: 'D',
        description: ''
      }
    ]
  }
]

//
// function deepFreeze(obj) {
//
//   // 取回定义在obj上的属性名
//   var propNames = Object.getOwnPropertyNames(obj);
//
//   // 在冻结自身之前冻结属性
//   propNames.forEach(function(name) {
//     var prop = obj[name];
//
//     // 如果prop是个对象，冻结它
//     if (typeof prop == 'object' && prop !== null)
//       deepFreeze(prop);
//   });
//
//   // 冻结自身(no-op if already frozen)
//   return Object.freeze(obj);
// }
