import follow from './modules/follow'
import consult from './modules/consult'
import inquiry from './modules/inquiry'
import login from './modules/login'
import patient from './modules/patient'
import prescribePrescrip from './modules/prescribePrescrip'
import personalCenter from './modules/personalCenter'
import privateDoctor from './modules/privateDoctor'
import health from './modules/health'

import video from './modules/video'

export default {
  /** 登录 */
  login,

  /** 随访 */
  follow,
  /** 个人中心 */
  personalCenter,
  /** 患者 */
  patient,
  /** 会诊 */
  consult,
  /** 问诊 */
  inquiry,
  /** 处方 */
  prescribePrescrip,
  /** 私人医生 */
  privateDoctor,

  /** 视频 */
  video,

  /** 健康档案 */
  health
}
