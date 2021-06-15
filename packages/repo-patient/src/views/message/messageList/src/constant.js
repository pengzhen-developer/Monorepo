/** 自定义推送消息 - 字典 */
export const INQUIRY_MESSAGE_TYPE = {
  发起问诊: '700',
  接诊: '710',
  病历: '720',
  处方: '730',
  审核处方通过: '731',
  结束问诊: '740',
  评价提示: '741',
  转诊提示: '742',
  会诊提示: '743',
  私人医生服务提醒: '744',
  服务包提醒: '745',
  退诊: '750',
  取消问诊: '760',
  视频通话: '770',
  视频异常: '771',
  服务提醒: '780',
  转诊单: '791',
  会诊单: '792',
  检查单: '793',
  问诊卡片: '794',
  转诊卡片: '795',
  检验挂号单: '797',
  检验单: '798'
}
/** 问诊状态 */
export const INQUIRY_STATUS = {
  待支付: 1,
  待接诊: 2,
  问诊中: 3,
  已退诊: 4,
  已完成: 5,
  已取消: 6
}
/**  咨询状态文字字典 */
export const INQUIRY_STATUS_MAP = {
  3: '咨询中',
  4: '已退诊',
  5: '已结束'
}
export const RETURNVISIT_STATUS_MAP = {
  3: '问诊中',
  4: '已退诊',
  5: '已结束'
}
export default {
  INQUIRY_MESSAGE_TYPE,
  INQUIRY_STATUS,
  INQUIRY_STATUS_MAP,
  RETURNVISIT_STATUS_MAP
}
