const formatRecord = (data) => {
  const list = data.msgInfo
  const doctor = data.doctorInfo
  const patient = data.patientInfo

  if (!list || !list.length) return []

  const msgList = []
  // 自定义消息、病历、处方、视频消息映射表
  const customMsgMaps = {
    '700': 100,
    '710': 100,
    '720': 7,
    '730': 8,
    '770': 9,
    '740': 100,
    '741': 100,
    '750': 100,
    '760': 100,
    '780': 780,
    '791': 791,
    '792': 792,
    '793': 793,
    '794': 794,
    '771': 771
  }

  list.forEach((chatItem) => {
    // 消息类型
    const type = parseInt(parseInt(chatItem.type) === 100 ? customMsgMaps[chatItem.body.code] : chatItem.type)
    // 消息是否为医生发送
    const isDoctor = chatItem.from === doctor.doctorId
    // 消息发送方姓名
    const name = isDoctor ? doctor.doctorName : patient.familyName
    // 图片消息的链接
    const imageUrl = type === 1 ? chatItem.body.url : ''
    let text = ''
    // 自定义消息
    if ([7, 8, 9, 100, 771, 741, 791, 792, 793, 794].includes(type)) {
      const info = chatItem.body.data.showTextInfo
      text = info.patientClientText
    } else if (type === 0) {
      // 文本消息
      text = chatItem.body.msg
    }
    const inquiryNo = type === 7 ? chatItem.body.data.inquiryInfo.inquiryNo : ''
    const presId = type === 8 ? chatItem.body.data.recipeInfo.recipeId : ''
    const timer = parseInt(chatItem.sendtime)
    const data = chatItem.body.data

    msgList.push({
      data,
      type,
      isDoctor,
      name,
      imageUrl,
      text,
      inquiryNo,
      presId,
      timer
    })
  })

  return msgList
}

export default {
  /**
   * 获取患者详情
   *
   * @param {*} params
   */
  getPatientDetail(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getPatientDetail'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      return res
    })
  },
  /**
   * 获取会话记录
   *
   * @param {*} params
   */
  getInquiryInfo(params) {
    const isMock = false
    const apiPath = 'nethospital/hospital/v1/Inquiry/getOneInquiry'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath
    const requestApi = isMock ? mockPath : serverPath
    return Peace.http.get(requestApi, { params }).then((res) => {
      const list = res.data
      res.data = Object.assign(list, { msgList: formatRecord(list) })
      return res
    })
  }
}
