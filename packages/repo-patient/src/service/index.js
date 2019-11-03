/*
 * @Author: PengZhen
 * @Description: 服务层入口文件
 * @Date: 2017-12-05
 */

import IM from './modules/IM'

import login from './modules/login'
import inquiry from './modules/inquiry'
import index from './modules/index'

import advert from './modules/advert'
import patient from './modules/patient'
import doctor from './modules/doctor'
import health from './modules/health'
import hospital from './modules/hospital'
import appoint from './modules/appoint'
import diagnose from './modules/diagnose'
import purchasedrug from './modules/purchasedrug'

export default {
  IM,
  inquiry,
  login,
  index,

  advert,
  patient,
  doctor,
  health,
  hospital,
  appoint,
  diagnose,
  purchasedrug
}
