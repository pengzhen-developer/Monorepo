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

  // 是否已完成平台微信授权，储存 plateform_openId
  WX_AUTH_PLATEFORM_OPEN_ID: 'WX_AUTH_PLATEFORM_OPEN_ID',
  // 是否已完成渠道微信授权，储存 channel_openId
  WX_AUTH_CHANNEL_OPEN_ID: 'WX_AUTH_CHANNEL_OPEN_ID',
  // 当前已授权的 CODE
  WX_AUTH_CODE: 'WX_AUTH_CODE',

  // 当前登录用户机构来源
  NETHOSPITALID: 'NETHOSPITALID',
  //当前登录用户机构来源名称
  NETHOSPITALNAME: 'NETHOSPITALNAME',
  // 当前登录用户渠道来源
  CHANNELID: 'CHANNELID',
  //当前用户是否通过分享进入机构主页
  IS_SHARE: 'IS_SHARE',

  // 是否扫码进入
  IS_EWM: 'h5.isEwm',
  //扫码操作状态
  EWM_STATUS: 'h5.ewmStatus',
  //  医生分享信息
  EWM_INFO: 'h5.ewmInfo'
}

/**
 * Vue 组件间数据通讯
 */
export const EMIT = {
  /** 问诊 - 新增家人 */
  DOCTOR_INQUIRY_APPLY_FAMLIY: 'DoctorInquiryApplyFamliy',
  /** 问诊 - 添加监护人 */
  DOCTOR_INQUIRY_APPLY_FAMLIY_GUARDIAN: 'DoctorInquiryApplyFamilyGuardian',
  /** 问诊 - 新增附件 */
  DOCTOR_INQUIRY_APPLY_UPLOAD: 'DoctorInquiryApplyUpload',

  /** 问诊 - 选择初诊诊断 */
  DOCTOR_INQUIRY_APPLY_ILLNESS: 'DoctorInquiryApplyIllness',

  /** 问诊 - 补充过敏史 */
  DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE: 'DoctorInquiryApplySupplementaryAllergiesSave',

  /** 问诊 - 补充上传 */
  DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD: 'DoctorInquiryApplySupplementaryUpload',

  /** 补充过敏 新增过敏史 */
  SUPPLEMENTARY_ALLERGIES: 'SUPPLEMENTARY_ALLERGIES',

  /**复诊 - 重新选择号源 */
  DOCTOR_RETURNVISIT_RESELECT_NUMBER: 'DoctorReturnVisitReselectNumber'
}

/**
 * 用户信息类型常量
 */
export const USER = {
  /** user info */
  INFO: 'h5.user.info',
  /** user tel */
  TEL: 'h5.user.tel',
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

  /** 自定义推送消息 - 字典 */
  INQUIRY_MESSAGE_TYPE: {
    发起问诊: '700',
    接诊: '710',
    病历: '720',
    处方: '730',
    审核处方通过: '731',
    结束问诊: '740',
    评价提示: '741',
    服务包提醒: '745',
    退诊: '750',
    取消问诊: '760',
    视频通话: '770',
    服务提醒: '780',
    问诊卡片: '794'
  },

  /** 用户操作 */
  INQUIRY_ACTION: {
    /** 发病历 */
    发病历: 'SEND_CASE',
    /** 发处方 */
    发处方: 'SEND_RECIPE',
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

  /** Vue 组件通讯 */
  EMIT,

  /** 用户信息类型常量 */
  USER,

  /** 问诊常量 */
  INQUIRY
}
