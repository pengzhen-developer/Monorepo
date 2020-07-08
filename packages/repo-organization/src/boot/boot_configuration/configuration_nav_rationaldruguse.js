/** 合理用药管理 - 机构端 */

export default [
  {
    id: '3-3',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '统计分析',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '3-3-1',
    parentId: '3-3',
    menuRouteName: 'TNA统计表',
    menuRoute: 'TNA统计表',
    menuName: 'TNA统计表',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/tanDrugs/tanDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-2',
    parentId: '3-3',
    menuRouteName: '管制药品统计',
    menuRoute: '管制药品统计',
    menuName: '管制药品统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/controlledDrugs/controlledDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-3',
    parentId: '3-3',
    menuRouteName: '药品用量统计',
    menuRoute: '药品用量统计',
    menuName: '药品用量统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/drugConsumption/drugConsumption.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-4',
    parentId: '3-3',
    menuRouteName: '处方拦截统计',
    menuRoute: '处方拦截统计',
    menuName: '处方拦截统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/prescriptionInterception/prescriptionInterception.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-5',
    parentId: '3-3',
    menuRouteName: '抗菌药物专项统计',
    menuRoute: '抗菌药物专项统计',
    menuName: '抗菌药物专项统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/antibacterialsSpecial/antibacterialsSpecial.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-6',
    parentId: '3-3',
    menuRouteName: '基本药物专项统计',
    menuRoute: '基本药物专项统计计',
    menuName: '基本药物专项统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/essentialDrugsSpecial/essentialDrugsSpecial.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-7',
    parentId: '3-3',
    menuRouteName: '处方适宜性统计',
    menuRoute: '处方适宜性统计',
    menuName: '处方适宜性统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/prescriptionSuitability/prescriptionSuitability.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-8',
    parentId: '3-3',
    menuRouteName: '处方信息统计',
    menuRoute: '处方信息统计',
    menuName: '处方信息统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + '/Engine/Web?uri=statisticalAnalysis/prescripFormation/prescripFormation.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-9',
    parentId: '3-3',
    menuRouteName: '处方报警统计',
    menuRoute: '处方报警统计',
    menuName: '处方报警统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/prescripAlarm/prescripAlarm.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-10',
    parentId: '3-3',
    menuRouteName: '注射药物专项统计',
    menuRoute: '注射药物专项统计',
    menuName: '注射药物专项统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/injectionDrugsSpecial/injectionDrugsSpecial.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-11',
    parentId: '3-3',
    menuRouteName: '处方疾病统计',
    menuRoute: '处方疾病统计',
    menuName: '处方疾病统计',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/prescripDisease/prescripDisease.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '4-4',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '字典管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '4-4-1',
    parentId: '4-4',
    menuRouteName: '给药途径',
    menuRoute: '给药途径',
    menuName: '给药途径',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/todrugchannelList/todrugchannelDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '4-4-2',
    parentId: '4-4',
    menuRouteName: '用药频次',
    menuRoute: '用药频次',
    menuName: '用药频次',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/todrugfrequencyList/todrugfrequencyDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '4-4-3',
    parentId: '4-4',
    menuRouteName: '药品单位',
    menuRoute: '药品单位',
    menuName: '药品单位',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/companyList/companyDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '4-4-4',
    parentId: '4-4',
    menuRouteName: 'ICD-10',
    menuRoute: 'ICD-10',
    menuName: 'ICD-10',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/ICD10NewList/iCD10NewDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '5-5',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药品管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '5-5-1',
    parentId: '5-5',
    menuRouteName: '药品目录',
    menuRoute: '药品目录',
    menuName: '药品目录',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'HospitalDrug/DrugList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药品属性',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '6-6-1',
    parentId: '6-6',
    menuRouteName: '基本药物',
    menuRoute: '基本药物',
    menuName: '基本药物',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/essentialDrugs/essentialDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-2',
    parentId: '6-6',
    menuRouteName: '抗菌药物',
    menuRoute: '抗菌药物',
    menuName: '抗菌药物',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/antibacterialDrugs/antibacterialDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-3',
    parentId: '6-6',
    menuRouteName: '麻精药物',
    menuRoute: '麻精药物',
    menuName: '麻精药物',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/anestheticDrugs/anestheticDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-4',
    parentId: '6-6',
    menuRouteName: '注射药物',
    menuRoute: '注射药物',
    menuName: '注射药物',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/injectionDrugs/injectionDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-5',
    parentId: '6-6',
    menuRouteName: '监控药品',
    menuRoute: '监控药品',
    menuName: '监控药品',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/monitoringDrugs/monitoringDrugs.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-6',
    parentId: '6-6',
    menuRouteName: '其他属性',
    menuRoute: '其他属性',
    menuName: '其他属性',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/otherAttributes/otherAttributes.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '6-6-7',
    parentId: '6-6',
    menuRouteName: '药理学分类',
    menuRoute: '药理学分类',
    menuName: '药理学分类',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=attributeDictionary/PharClassification/PharClassification.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '规则字典',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '7-7-1',
    parentId: '7-7',
    menuRouteName: 'TNA药品',
    menuRoute: 'TNA药品',
    menuName: 'TNA药品',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/TANDrugList/TANDrugList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-2',
    parentId: '7-7',
    menuRouteName: '检验维护',
    menuRoute: '检验维护',
    menuName: '检验维护',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/checkItemList/checkItemList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-3',
    parentId: '7-7',
    menuRouteName: '药品包装规格',
    menuRoute: '药品包装规格',
    menuName: '药品包装规格',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + '/CustDrug/CustDrug',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-4',
    parentId: '7-7',
    menuRouteName: '单位转换',
    menuRoute: '单位转换',
    menuName: '单位转换',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'CustDrug/UnitSwitch',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-5',
    parentId: '7-7',
    menuRouteName: '过敏维护 ',
    menuRoute: '过敏维护 ',
    menuName: '过敏维护 ',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/allergyInfoList/allergyInfoDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-6',
    parentId: '7-7',
    menuRouteName: '人群维护',
    menuRoute: '人群维护',
    menuName: '人群维护',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/humanClassifyList/humanClassifyDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-7',
    parentId: '7-7',
    menuRouteName: '年龄维护',
    menuRoute: '年龄维护',
    menuName: '年龄维护',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/ageInfoList/ageInfoDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '7-7-8',
    parentId: '7-7',
    menuRouteName: '诊断维护',
    menuRoute: '诊断维护',
    menuName: '诊断维护',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=dictionary/organDictionary/diagnosisList/diagnosisDataList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '8-8',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '规则管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '8-8-1',
    parentId: '8-8',
    menuRouteName: '基础规则',
    menuRoute: '基础规则',
    menuName: '基础规则',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=drugRuleRepository/baseRule/baseRuleList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '8-8-2',
    parentId: '8-8',
    menuRouteName: 'TNA规则',
    menuRoute: 'TNA规则',
    menuName: 'TNA规则',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=drugRuleRepository/TANRule/TANRuleList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '8-8-3',
    parentId: '8-8',
    menuRouteName: '药品规则',
    menuRoute: '药品规则',
    menuName: '药品规则',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=drugRuleRepository/organDrugRule/ogranDrugRuleList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '8-8-4',
    parentId: '8-8',
    menuRouteName: '科室规则',
    menuRoute: '科室规则',
    menuName: '科室规则',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=drugRuleRepository/organRuleManagement/organRuleManagement.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '8-8-5',
    parentId: '8-8',
    menuRouteName: '管理规则',
    menuRoute: '管理规则',
    menuName: '管理规则',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=drugRuleRepository/organManageRule/organManageRuleList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '9-9',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '处方管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '9-9-1',
    parentId: '9-9',
    menuRouteName: '处方审核验证',
    menuRoute: '处方审核验证',
    menuName: '处方审核验证',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Engine/Web?uri=statisticalAnalysis/prescriptionVerification/prescriptionVerification.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '9-9-2',
    parentId: '9-9',
    menuRouteName: '处方列表',
    menuRoute: '处方列表',
    menuName: '处方列表',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + '/PrescriptionList/PrescriptionList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '10-10',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '处方点评',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '10-10-1',
    parentId: '10-10',
    menuRouteName: '处方点评',
    menuRoute: '处方点评',
    menuName: '处方点评',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Sampling/PrescriptionReview',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '10-10-2',
    parentId: '10-10',
    menuRouteName: '医嘱点评',
    menuRoute: '医嘱点评',
    menuName: '医嘱点评',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Sampling/DoctorAdviceReview',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '10-10-3',
    parentId: '10-10',
    menuRouteName: '病历抽样',
    menuRoute: '病历抽样',
    menuName: '病历抽样',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Sampling/CaseSampleList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '10-10-4',
    parentId: '10-10',
    menuRouteName: '处方抽样',
    menuRoute: '处方抽样',
    menuName: '处方抽样',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Sampling/SamplingList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '10-10-5',
    parentId: '10-10',
    menuRouteName: '点评设置',
    menuRoute: '点评设置',
    menuName: '点评设置',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'PrescriptionComment/PrescriptionComment',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '11-11',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '权限管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '11-11-1',
    parentId: '11-11',
    menuRouteName: '部门申请审核',
    menuRoute: '部门申请审核',
    menuName: '部门申请审核',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'DepartmentApplyEntryReview/DepartmentApplyEntryReview',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '11-11-2',
    parentId: '11-11',
    menuRouteName: '我的部门',
    menuRoute: '我的部门',
    menuName: '我的部门',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Department/MyDepartment',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '11-11-3',
    parentId: '11-11',
    menuRouteName: '角色管理',
    menuRoute: '角色管理',
    menuName: '角色管理',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'RoleNew/RoleNew',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '11-11-4',
    parentId: '11-11',
    menuRouteName: '账号管理',
    menuRoute: '账号管理',
    menuName: '账号管理',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'UserNew/UserNew',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '11-11-5',
    parentId: '11-11',
    menuRouteName: '部门管理',
    menuRoute: '部门管理',
    menuName: '部门管理',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Department/Department',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
