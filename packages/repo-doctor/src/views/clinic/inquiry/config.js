export default {
  api: {
    // 获取问诊订单详情
    getInquiryByNo: 'client/v1/inquiry/getInquiryByNo',

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

    // 获取既往史
    OldIllnessList: '/client/v1/patient/OldIllnessList',
    // 添加既往史
    addOldIllness: 'client/v1/patient/addOldIllness',
    // 获取诊断
    IllnessList: '/client/v1/patient/IllnessList',
    // 添加诊断
    addIllness: 'client/v1/patient/addIllness',
    // 获取过敏源
    allergens: '/client/v1/patient/allergens',
    // 添加过敏源
    addAllergen: 'client/v1/patient/addAllergen',

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
    addReferral: 'client/v1/inquiry/addReferral',

    // 获取会诊医生列表
    chooseConsultationDoctor: 'client/v1/consult/chooseDoctor',
    // 会诊提交
    doConsultationApply: 'client/v1/consult/doApply'
  }
}
