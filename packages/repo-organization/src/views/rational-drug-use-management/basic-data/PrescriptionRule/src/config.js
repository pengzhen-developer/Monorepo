export default [
  {
    instance: () => import('./components/适应症'),
    key: 'diagnosisRuleItemList',
    name: '适应症',
    model: {
      diagnosisItemList: [],
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        diagnosisItemList: [],
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/剂量范围'),
    key: 'dosageRuleList',
    name: '剂量范围',
    model: {
      dosageRuleList: {
        dosagetype: '0'
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        dosageRuleList: {
          dosagetype: '0'
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/频次'),
    key: 'frequencyRuleList',
    name: '频次',
    model: {
      frequencyRuleList: {},
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        frequencyRuleList: {},
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/极量'),
    key: 'extremeDoseRuleList',
    name: '极量',
    model: {
      extremeDoseRuleList: {
        dosageType: '0'
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        extremeDoseRuleList: {
          dosageType: '0'
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/给药途径'),
    key: 'routeRuleItemList',
    name: '给药途径',
    model: {
      routeRuleObj: {
        contain: '0',
        routeItemList: []
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        routeRuleObj: {
          contain: '0',
          routeItemList: []
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/用药疗程'),
    key: 'treatmentRuleList',
    name: '用药疗程',
    model: {
      treatmentRuleList: {
        operator: '>'
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        treatmentRuleList: {
          operator: '>'
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/禁忌症'),
    key: 'contraindicationRuleItemList',
    name: '禁忌症',
    model: {
      contraindicationItemList: [],
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        contraindicationItemList: [],
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/年龄'),
    key: 'ageRuleItemList',
    name: '年龄',
    model: {
      ageRuleList: {
        humanCode: ''
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        ageRuleList: {
          humanCode: ''
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/性别'),
    key: 'genderRule',
    name: '性别',
    model: {
      genderRuleList: {
        gender: '男'
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        genderRuleList: {
          gender: '男'
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/过敏'),
    key: 'allergyRuleItemList',
    name: '过敏',
    model: {
      allergyItemList: [],
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        allergyItemList: [],
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/人群'),
    key: 'humanClassifyRuleItemList',
    name: '人群',
    model: {
      humanclassifyItemList: [],
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        humanclassifyItemList: [],
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/相互作用'),
    key: 'ddiRuleItemList',
    name: '相互作用',
    model: {
      ddiRuleObj: {
        ddiItemList: [],
        ddiContraryItemList: []
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        ddiRuleObj: {
          ddiItemList: [],
          ddiContraryItemList: []
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/重复用药'),
    key: 'duplicatetherapyRuleItemList',
    name: '重复用药',
    model: {
      duplicatetherapyRuleObj: {
        dupLists: [],
        dupItemList: []
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        duplicatetherapyRuleObj: {
          dupLists: [],
          dupItemList: []
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/配伍禁忌'),
    key: 'incompatibilityRuleItemList',
    name: '配伍禁忌',
    model: {
      incompatibilityRuleObj: {
        incompatibilitySourceItemList: [],
        incompatibilityTargetItemList: []
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        incompatibilityRuleObj: {
          incompatibilitySourceItemList: [],
          incompatibilityTargetItemList: []
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/配伍浓度'),
    key: 'compatibilityconcRuleList',
    name: '配伍浓度',
    model: {
      compatibilityconcRuleList: {
        operator: '>'
      },
      ruleState: 1,
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        compatibilityconcRuleList: {
          operator: '>'
        },
        ruleState: 1,
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
      }
    ]
  },
  {
    instance: () => import('./components/注射速度'),
    key: 'instillationSpeedRuleList',
    name: '注射速度',
    model: {
      instillationspeedRuleList: {},
      warningLevel: 'D',
      conditionExpressionString: { ceList: undefined, hasPrecondition: false }
    },
    models: [
      {
        instillationspeedRuleList: {},
        warningLevel: 'D',
        conditionExpressionString: { ceList: undefined, hasPrecondition: false }
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
