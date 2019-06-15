/*
 * @Author: PengZhen
 * @Date: 2019-04-16 09:48:47
 * @Description: 我的诊室
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-05-15 11:43:25
 */

export const STATE = {
  msgFlow: {
    患者消息: 'in',
    医生消息: 'out',

    // 自定义扩展
    系统消息: 'system'
  },

  // 消息类型
  msgType: {
    文本消息: 'text',
    图片消息: 'image',
    视频消息: 'video',
    自定义消息: 'custom'
  },

  // 问诊类型
  talkType: {
    图文问诊: 1,
    视频问诊: 2
  },

  // 自定义消息体的病历 / 处方
  sendType: {
    病历消息: 0,
    处方消息: 1,
    音频消息: 2,
    视频消息: 3
  },

  // 问诊状态
  talkState: {
    未接诊: 1,
    未填写病历: 2,
    已填写病历: 3,
    退诊: 4,
    结束: 5
  },

  // 处方状态
  prescriptionState: {
    未审方: 0,
    质疑中: 1,
    申诉中: 2,
    已通过: 3,
    已分配: 4,
    已发药: 5,
    已拒绝: 6,
    已作废: 7
  }
}

/**
 * 反序列化 sessions
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 sessions, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} sessions
 * @returns
 */
export function DeserializationSessions(sessions) {
  let temp = $peace.util.clone(sessions)

  if (temp) {
    temp.forEach(session => {
      if (session.lastMsg.custom && !(session.lastMsg.custom instanceof Object)) {
        session.lastMsg.custom = JSON.parse(session.lastMsg.custom)
      }

      if (session.lastMsg.content && !(session.lastMsg.content instanceof Object)) {
        session.lastMsg.content = JSON.parse(session.lastMsg.content)
      }
    })

    // 过滤垃圾数据
    temp = temp.filter(item => item.lastMsg.custom && item.lastMsg.custom.ext)
  }

  return temp
}

/**
 * 反序列化 session msgs
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 sessions, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} sessions
 * @returns
 */
export function DeserializationSessionMsgs(msgs) {
  let temp = $peace.util.clone(msgs)

  if (temp) {
    temp.forEach(msg => {
      if (msg.custom && !(msg.custom instanceof Object)) {
        msg.custom = JSON.parse(msg.custom)
      }

      if (msg.content && !(msg.content instanceof Object)) {
        msg.content = JSON.parse(msg.content)
      }
    })

    // 过滤垃圾数据
    temp = temp.filter(item => item.custom && item.custom.ext)
  }

  return temp
}

/**
 * 反序列化 Teams
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 Teams, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} Teams
 * @returns
 */
export function DeserializationTeams(teams) {
  let temp = $peace.util.clone(teams)

  if (temp) {
    temp.forEach(team => {
      if (team.custom && !(team.custom instanceof Object)) {
        team.custom = JSON.parse(team.custom)
      }

      if (team.content && !(team.content instanceof Object)) {
        team.content = JSON.parse(team.content)
      }
    })

    // 过滤垃圾数据
    // temp = temp.filter(item => item.custom)
  }

  return temp
}

/**
 * 反序列化 Team msgs
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 sessions, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} Team Messages
 * @returns
 */
export function DeserializationTeamMsgs(msgs) {
  let temp = $peace.util.clone(msgs)

  if (temp) {
    temp.forEach(msg => {
      if (msg.custom && !(msg.custom instanceof Object)) {
        msg.custom = JSON.parse(msg.custom)
      }

      if (msg.content && !(msg.content instanceof Object)) {
        msg.content = JSON.parse(msg.content)
      }
    })
  }

  return temp
}

export default {
  STATE,

  DeserializationSessions,
  DeserializationTeams,

  DeserializationSessionMsgs,
  DeserializationTeamMsgs
}
