export default {
  api: {
    // 获取病例
    getOneInquiry: 'client/v1/Patient/getOneInquiry',

    // 获取会诊详情
    getConsultInfo: 'client/v1/consult/getConsultInfo',

    // 根据群组id 获取问诊详情
    getInfoByTeamId: 'client/v1/consult/getInfoByTeamId',

    // 获取会诊状态字典
    getConsultStatusMap: 'client/v1/consult/getConsultStatusMap',

    // 查询会诊医生
    chooseDoctor: 'client/v1/consult/chooseDoctor',
    // 查询协同医生
    inviteDoctor: 'client/v1/consult/inviteDoctor',

    // 提交协同医生
    chooseInviteDoctor: 'client/v1/consult/chooseInviteDoctor'
  }
}
