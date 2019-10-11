/**
 * 系统消息类型常量
 */
export const SYSTEM = {
  /** 系统消息类型 */
  MESSAGE: {
    /** 提示类型 */
    INFO: 'info',
    /** 错误类型 */
    ERROR: 'error',
    /** 成功类型 */
    SUCCESS: 'success',
    /** 警告类型 */
    WARNING: 'warning'
  },

  /** 系统缓存类型常量 */
  CACHE: {
    /** 存储类型 - localStorage */
    LOCAL_STORAGE: 'localStorage',
    /** 存储类型 - sessionStorage */
    SESSION_STORAGE: 'sessionStorage'
  },

  PARAMS: 'params'
}

/**
 * 用户信息类型常量
 */
export const USER = {
  /** user info */
  INFO: 'h5.user.info',

  /** user token */
  TOKEN: 'h5.user.token',

  /** 最近操作功能列表 */
  TAB_LIST: 'h5.user.tabList'
}

/**
 * 问诊常量
 */
export const INQUIRY = {
  /** 自动退诊时间(小时) : 默认 12 小时 */
  自动退诊时间: 12,

  /** 问诊状态 */
  INQUIRY_STATUS: {
    待支付: 1,
    待接诊: 2,
    问诊中: 3,
    已退诊: 4,
    已完成: 5,
    已取消: 6
  },

  /** 问诊类型 */
  INQUIRY_TYPE: {
    图文问诊: 'image',
    视频问诊: 'video'
  },

  /** 是否发送病历 */
  ISSEND_CASE: {
    未发送病历: 0,
    已发送病历: 1
  },

  /** 是否私人医生 */
  IS_PRIVATE_DOCTOR: {
    非私人医生: 0,
    是私人医生: 1
  },

  /** 自定义推送消息 - 字典 */
  INQUIRY_MESSAGE_TYPE: {
    发起问诊: '700',
    接诊: '710',
    病历: '720',
    处方: '730',
    结束问诊: '740',
    评价提示: '741',
    转诊提示: '742',
    会诊提示: '743',
    私人医生服务提醒: '744',
    退诊: '750',
    取消问诊: '760',
    视频通话: '770'
  },

  /** 用户操作 */
  INQUIRY_ACTION: {
    /** 发病历 */
    发病历: 'SEND_CASE',
    /** 发处方 */
    发处方: 'SEND_RECIPE',
    /** 发转诊 */
    发转诊: 'SEND_TRANSFER',
    /** 发会诊 */
    发会诊: 'SEND_CONSULTATION',

    /** 重置操作 */
    重置操作: 'RESET_ACTION'
  },

  /** 视频问诊状态 */
  BE_CALL_STATE: {
    邀请: 1,
    收到: 2,
    接听: 3,
    拒绝: 4,
    挂断: 5
  }
}

export default {
  /** 系统消息类型常量 */
  SYSTEM,

  /** 用户信息类型常量 */
  USER,

  /** 问诊常量 */
  INQUIRY
}
