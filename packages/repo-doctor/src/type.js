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
  }
}

/**
 * 用户信息类型常量
 */
export const USER = {
  /** user info */
  INFO: 'pc.user.info',

  /** user token */
  TOKEN: 'pc.user.token',

  /** 最近操作功能列表 */
  TAB_LIST: 'pc.user.tabList',

  /** 用户名 */
  PHONE: 'pc.phone.number'
}

/**
 * 问诊类型常量
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
    退诊: '750',
    取消问诊: '760',
    视频通话: '770',
    视频记录: '771',
    服务提醒: '780',
    转诊单: '791',
    会诊单: '792',
    检查单: '793',
    问诊卡片: '794',
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

/**
 * 会诊类型常量
 */
export const CONSULTATION = {
  /** 会诊状态 */
  CONSULTATION_STATUS: {
    发起待审核: 1,
    发起已拒绝: 2,
    邀请待审核: 3,
    邀请已拒绝: 4,
    等待会诊: 5,
    会诊中: 6,
    会诊已完成: 7,
    会诊已关闭: 8,
    医生待审核: 9,
    医生已退诊: 10
  },

  /** 会诊状态 - 扩展 */
  CONSULTATION_STATUS_EXTEND: {
    距开始: 1,
    距结束: 2,
    会诊中: 3
  },

  /** 自定义推送消息 - 字典 */
  CONSULTATION_MESSAGE_TYPE: {
    发起会诊: '800',
    创建房间: '801',
    加入房间: '802',
    邀请协同会诊: '803',
    会诊期望时间推送: '804',
    会诊中: '810',
    同意加入频道: '811',
    拒绝加入频道: '812',
    退出频道: '813',
    解散频道: '814',
    强制解散频道: '815',
    关闭会诊: '820',
    结束会诊: '830',
    视频记录: '850',
    病历: '806',
    处方: '807',
    会诊所见: '808'
  }
}

/**
 * IM 视频常量
 */
export const VIDEO = {
  /** 视频状态 */
  BE_CALL_STATE: {
    邀请: 1,
    收到: 2,
    接听: 3,
    拒绝: 4,
    挂断: 5,
    超时: 6
  }
}

/**
 * 健康档案
 */
export const HEALTH = {
  HEALTH_TYPE: {
    血氧: 'bloodOxygenData',
    血压: 'bloodPressureData',
    血糖: 'bloodSugarData',
    体脂: 'bodyFat',
    病历: 'case',
    处方: 'prescribe',
    转诊: 'referral',
    会诊: 'consult'
  },

  TYPE: {
    血糖: '1',
    血压: '2',
    心电: '3',
    体温: '4',
    血氧: '5',
    体重: '6',
    运动: '7',
    体脂: '8',
    睡眠: '9'
  },

  SERVICE_ID: {
    血压监测月报: '301',
    血糖监测月报: '302',
    睡眠监测月报: '309',
    运动监测月报: '310',
    体重监测月报: '311',
    血压监测周报: '304',
    血糖监测周报: '305',
    睡眠监测周报: '306',
    运动监测周报: '317',
    体重监测周报: '318',
    完美档案: '704',
    无: '-'
  }
}

export const HEALTH_RECORD = {
  ACTION_TYPE: {
    咨询: '1',
    病程: '2',
    随访: '3',
    转诊: '4',
    会诊: '5',
    发起转诊: '6',
    发起会诊: '7',
    添加随访方案: '8',
    新建自定义方案: '9',
  },
  EMPTY_TEXT: {
    '1': {
      'out': '暂无咨询记录',
      'in': '暂无问询记录'
    },
    '2': '暂无数据',
    '3': {
      'out': '您暂未为该患者制定随访方案',
      'in': '暂无随访记录'
    },
    '4': {
      'out': '您暂未为该患者发起任何转诊',
      'in': '暂无其他医生将该患者转诊给您'
    },
    '5': {
      'out': '您暂未为该患者发起任何会诊申请',
      'in': '暂无其他医生为该患者向您发起会诊'
    }
  }
}

export default {
  /** 系统消息类型常量 */
  SYSTEM,

  /** 用户信息类型常量 */
  USER,

  /** 问诊类型常量 */
  INQUIRY,

  /** 会诊类型常量 */
  CONSULTATION,

  /** 视频常量 */
  VIDEO,

  /** 健康档案 */
  HEALTH,

  HEALTH_RECORD,
}
