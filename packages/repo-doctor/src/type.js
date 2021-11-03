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
    图文: 'image',
    视频: 'video',
    复诊: 'returnVisit'
  },

  /** 问诊支付类型 */
  INQUIRY_PAY_TYPE: {
    自费: 1,
    医保: 2,
    商保: 3,
    门特: 4
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
  CHECK_TYPE: {
    检验: 'inspection',
    影像: 'pacs'
  },

  HEALTH_TYPE: {
    血氧: 'bloodOxygenData',
    血压: 'bloodPressureData',
    血糖: 'bloodSugarData',
    体脂: 'bodyFat',
    病历: 'case',
    处方: 'prescribe',
    转诊: 'referral',
    会诊: 'consult',
    诊疗记录: 'firstRecord'
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
    添加病程: '9'
  },
  EMPTY_TEXT: {
    '1': {
      inquiry: '暂无咨询记录',
      followUp: '暂无问询记录'
    },
    '2': '暂无数据',
    '3': {
      out: '您暂未为该患者制定随访方案',
      in: '暂无随访记录'
    },
    '4': {
      out: '您暂未为该患者发起任何转诊',
      in: '暂无其他医生将该患者转诊给您'
    },
    '5': {
      out: '您暂未为该患者发起任何会诊申请',
      in: '暂无其他医生为该患者向您发起会诊'
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

  /** 视频常量 */
  VIDEO,

  /** 健康档案 */
  HEALTH,

  HEALTH_RECORD
}
