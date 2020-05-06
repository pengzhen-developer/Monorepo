import peace from '@src/library'

/**
 * 获取患者家人列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFamilyList(params) {
  const getFamilyList = 'client/v1/health/getFamilyList'

  return peace.http.post(getFamilyList, params)
}

/**
 * 获取家人基本健康信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOneHealth(params) {
  const getOneHealth = 'client/v1/health/getOneHealth'

  return peace.http.post(getOneHealth, params)
}

/**
 * 获取健康档案全部数据统计
 *
 * @export
 * @param {*} params
 * @returns
 */
export function allHealthList(params) {
  const allHealthList = 'client/v1/health/allHealthList'

  return peace.http.post(allHealthList, params)
}

/**
 * 获取 【血糖】，【血压】 最近数据
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOscillogram(params) {
  const getOscillogram = 'client/v1/health/getOscillogram'

  return peace.http.post(getOscillogram, params)
}

/**
 * 获取 【血糖】，【血压】 周报列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getWeekList(params) {
  const getWeekList = 'client/v1/health/getWeekList'

  return peace.http.post(getWeekList, params)
}

/**
 * 获取 【血糖】，【血压】 周报详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getWeekDetail(params) {
  const getWeekDetail = 'client/v1/health/getWeekDetail'

  return peace.http.post(getWeekDetail, params)
}

/**
 * 获取 【血糖】，【血压】 历史数据
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOneRecord(params) {
  const getOneRecord = 'client/v1/health/getOneRecord'

  return peace.http.post(getOneRecord, params)
}

/**
 * 获取会诊详情接口数据
 *
 * @export
 * @param {*} params
 * @returns
 *
 * {
    "code": 200,
    "success": true,
    "msg": "获取成功",
    "data": {
        "familyInfo": {
            "familyName": "周佳",
            "familySex": "男",
            "familyAge": 29,
            "createdTime": "2019-12-03 14:56:55"
        },
        "doctorInfo": {
            "fromDoctorName": "何泰樑",
            "fromDocPhoto": "https://devdoctor.hp.aijiayi.com//data/20190923/20190923174634amtflx_500_500.png",
            "fromHospitalName": "武汉市第一医院",
            "fromDeptName": "呼吸内科",
            "fromDoctorTitle": "副主任医师",
            "toDoctorName": "刘熠",
            "toDocPhoto": "https://devdoctor.hp.aijiayi.com/data/20190625/20190625120845hgkkli_640_640.png",
            "toHospitalName": "武汉九州通医院",
            "toDeptName": "普通外科",
            "toDoctorTitle": "医师"
        },
        "consultSummary": {
            "consultFind": "",
            "consultDiagnose": "",
            "consultSuggest": "",
            "doctorSignImg": ""
        },
        "caseInfo": {
            "caseNo": "BL201912095461129",
            "visitDate": "2019-12-09 19:14:54",
            "baseIllness": "肚子不舒服",
            "presentHistory": "消化",
            "allergyHistory": "酒精过敏",
            "pastHistory": "消化不良",
            "InspectionIndex": {
                "blood_pressure": "110/66",
                "temperature": "37",
                "weight": "65",
                "heart_rate": "66",
                "More": "的人特热体人体如题如题的风格"
            },
            "diagnose": "急性气管支气管炎 | 原发性高血压",
            "summary": "的发挥规范化",
            "ALT": "",
            "AST": "",
            "HBV": ""
        },
        "prescribeInfos": {
            "list": [
                {
                    "prescriptionNo": "2019121034751663",
                    "diagnosisInfos": "原发性高血压 | 急性气管支气管炎 | 慢性扁桃体炎",
                    "drugCode": [
                        {
                            "drugCode": "darrwgxkjo",
                            "drugName": "祛痰止咳胶囊",
                            "drugQty": 3,
                            "drugSpecifications": "每粒装0.35g",
                            "drugUse": "用法用量：局麻。每次3g,每周 星期2,4,1天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                },
                {
                    "prescriptionNo": "2019121011498603",
                    "diagnosisInfos": "原发性高血压 | 急性气管支气管炎 | 脑梗死",
                    "drugCode": [
                        {
                            "drugCode": "qvnexmozdm",
                            "drugName": "阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)",
                            "drugQty": 2,
                            "drugSpecifications": "0.643g*12袋",
                            "drugUse": "用法用量：膀胱灌注。每次3g,每周 星期2,4,1天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                },
                {
                    "prescriptionNo": "2019121049878824",
                    "diagnosisInfos": "脑梗死 | 急性上呼吸道感染 | 慢性扁桃体炎 | 原发性高血压",
                    "drugCode": [
                        {
                            "drugCode": "qvnexmozdm",
                            "drugName": "阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)",
                            "drugQty": 2,
                            "drugSpecifications": "0.643g*12袋",
                            "drugUse": "用法用量：腹腔化疗。每次4g,每日下午1次,1天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                },
                {
                    "prescriptionNo": "201912105911649",
                    "diagnosisInfos": "急性气管支气管炎 | 原发性高血压 | 慢性扁桃体炎",
                    "drugCode": [
                        {
                            "drugCode": "qvnexmozdm",
                            "drugName": "阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)",
                            "drugQty": 3,
                            "drugSpecifications": "0.643g*12袋",
                            "drugUse": "用法用量：局麻。每次3g,每周 星期2,4,1天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                },
                {
                    "prescriptionNo": "2019120957216479",
                    "diagnosisInfos": "急性气管支气管炎 | 原发性高血压",
                    "drugCode": [
                        {
                            "drugCode": "qvnexmozdm",
                            "drugName": "阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)",
                            "drugQty": 1,
                            "drugSpecifications": "0.643g*12袋",
                            "drugUse": "用法用量：腹腔化疗。每次1g,每周 星期1,6,25天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                },
                {
                    "prescriptionNo": "2019121036276116",
                    "diagnosisInfos": "原发性高血压 | 脑梗死",
                    "drugCode": [
                        {
                            "drugCode": "qvnexmozdm",
                            "drugName": "阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)",
                            "drugQty": 5,
                            "drugSpecifications": "0.643g*12袋",
                            "drugUse": "用法用量：静脉注射2。每次4g,每周 星期2,4,1天"
                        }
                    ],
                    "prescription": 1,
                    "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
                    "psychiatric": null,
                    "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191210ywq/20191210164155_3450061.jpg",
                    "prescriptionPharmacistName": null,
                    "prescriptionSign": "",
                    "disPharmacist": "",
                    "sendPharmacist": "",
                    "claimNo": null
                }
            ],
            "total": 6
        }
    },
    "param": null
}
 */
export function consultDetail({dataNo}) {
  const params = {
    dataNo
  }
  const path = 'client/v1/health/consultDetail'

  return peace.http.post(path, params)
}


/**
 * 获取 【转诊记录列表接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getReferralRecordList(params) {
  const getReferralRecordList = 'client/v1/patient/DoctorReferralList'

  return peace.http.post(getReferralRecordList, params)
}


/**
 * 【线下转诊提交接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function offlineAddReferral(params) {
  const offlineAddReferral = 'client/v1/inquiry/offlineAddReferral'

  return peace.http.post(offlineAddReferral, params)
}

/**
 * 获取 【会诊记录列表接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getConsultRecordList(params) {
  const getConsultRecordList = 'client/v1/consult/getConsultListByPc'

  return peace.http.post(getConsultRecordList, params)
}


/**
 * 【会诊提交接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function offlineAddConsult(params) {
  const offlineAddConsult = 'client/v1/consult/offlineDoApply'

  return peace.http.post(offlineAddConsult, params)
}


/**
 * 获取 【获取方案库列表接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFollowUpSchemeList(params) {
  const getFollowUpSchemeList = 'client/v1/followup/scheme'

  return peace.http.post(getFollowUpSchemeList, params)
}

/**
 * 【保存医嘱信息接口】
 *
 * @export
 * @param {*} params
 * @returns
 */
export function AddFollowUpScheme(params) {
  const addFollowUpScheme = 'client/v1/followup/addScenario'

  return peace.http.post(addFollowUpScheme, params)
}


export default {
  /** 获取患者家人列表 */
  getFamilyList,
  /** 获取家人基本健康信息 */
  getOneHealth,

  /** 获取健康档案全部数据统计 */
  allHealthList,

  /** 获取 【血糖】，【血压】 最近数据 */
  getOscillogram,
  /** 获取 【血糖】，【血压】 周报列表 */
  getWeekList,
  /** 获取 【血糖】，【血压】 周报详情 */
  getWeekDetail,
  /** 获取 【血糖】，【血压】 历史数据 */
  getOneRecord,
  /** 获取 会诊详情 */
  consultDetail,
  /** 转诊列表 */
  getReferralRecordList,
  /** 发起转诊 */
  offlineAddReferral,
  /** 会诊列表 */
  getConsultRecordList,
  /** 发起会诊 */
  offlineAddConsult,
  /** 随访方案库列表 */
  getFollowUpSchemeList,
  /** 保存医嘱信息接口 */
  AddFollowUpScheme,
}
