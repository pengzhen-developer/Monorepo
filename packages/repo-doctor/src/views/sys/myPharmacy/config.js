export default {
  api: {
    // 获取常用药品列表
    getDrugList: '/client/v1/Commonlyuseddrug/getCommonlyUsedDrugList',
    // 药品说明书列表
    getDrugSynopsisList: '/client/v1/Commonlyuseddrug/getDrugBookList',
    // 获取药品说明书
    getDrugSynopsisDetail: '/client/v1/Commonlyuseddrug/getDrugbookinfo',
    // 获取药品列表
    getDrugs: '/client/v1/Commonlyuseddrug/drugsList',
    // 加入常用药品
    intoDrug: '/client/v1/Commonlyuseddrug/AddCommonlyUsedDrug',
    // 移出常用药品
    removeDrug: '/client/v1/Commonlyuseddrug/delCommonlyUsedDrug',

    // 获取常用处方列表
    getPrescList: '/client/v1/Commonprescriptions/getCommonPrescriptionsList',
    // 常用处方药品查询列表
    getPrescDrugList: '/client/v1/Prescribeprescrip/drugsList',
    // 加入常用处方
    intoPresc: '/client/v1/Commonprescriptions/AddCommonPrescriptions',
    // 修改常用处方
    editPresc: '/client/v1/Commonprescriptions/editCommonPrescriptions',
    // 删除常用处方
    removePresc: '/client/v1/Commonprescriptions/delCommonPrescriptions',
    // 用药频次
    getFrequencys: '/client/v1/Prescribeprescrip/drugFrequencyList',
    // 给药途径
    getUsages: '/client/v1/Prescribeprescrip/drugUsageList',
    // 获取患者疾病信息
    getDiseaseInfo: 'client/v1/patient/getDiseaseInfo'
  }
}
