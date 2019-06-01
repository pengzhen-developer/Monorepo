export default {
  api: {
    // 获取会诊状态字典
    getRefferStatus: 'client/v1/inquiry/getRefferStatus',

    // 获取会诊列表， 发起
    getOutConsultList: 'client/v1/consult/getOutConsultList',
    // 获取会诊列表， 邀请
    getInConsultList: 'client/v1/consult/getInConsultList',

    // 获取会诊详情
    getConsultInfo: 'client/v1/consult/getConsultInfo'
  }
}
