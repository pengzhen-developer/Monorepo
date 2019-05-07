export default {
  api: {
    // 接诊
    receiveInquiry: 'client/v1/patient/receiveInquiry',
    // 退诊
    quitInquiry: 'client/v1/patient/quitInquiry',

    // 结束问诊前，验证问诊状态
    checkOverInquiry: 'client/v1/patient/checkOverInquiry',
    // 结束问诊
    overInquiry: 'client/v1/patient/overInquiry',

    // 写病历
    addCase: 'client/v1/Prescribeprescrip/addCase',
    // 获取患者疾病信息
    getDiseaseInfo: 'client/v1/patient/getDiseaseInfo',
    // 获取患者过敏信息
    allergenList: 'client/v1/patient/allergenList',

    // 获取病历详情
    getCase: 'client/v1/inquiry/getCase',

    // 获取药品用法字典
    drugUsageList: 'client/v1/Prescribeprescrip/drugUsageList',
    // 获取药品频次字典
    drugFrequencyList: 'client/v1/Prescribeprescrip/drugFrequencyList',
    // 获取药品列表自动完成
    drugsList: 'client/v1/Prescribeprescrip/drugsList',
    // 提交处方
    subPrescrip: 'client/v1/Prescribeprescrip/subPrescrip',

    // 获取转诊医生列表
    referralDocListPc: 'client/v1/inquiry/referralDocListPc',
    // 问诊转诊提交
    addReferral: 'client/v1/inquiry/addReferral'
  }
}
