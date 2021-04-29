export default {
  /**
   * 规则字典三级菜单
   *
   * */
  menuList: [
    { id: '0', title: 'TNA药品', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/TANDrugList/TANDrugList.html' },
    { id: '1', title: '检验维护', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/checkItemList/checkItemList.html' },
    { id: '2', title: '药品包装信息', type: 'component', url: 'DrugPackagingInformation' },
    { id: '3', title: '过敏维护', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/allergyInfoList/allergyInfoDataList.html' },
    { id: '4', title: '人群维护', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/humanClassifyList/humanClassifyDataList.html' },
    { id: '5', title: '年龄维护', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/ageInfoList/ageInfoDataList.html' },
    { id: '6', title: '诊断维护', type: 'iframe', url: '/Engine/Web?uri=dictionary/organDictionary/diagnosisList/diagnosisDataList.html' }
  ]
}
