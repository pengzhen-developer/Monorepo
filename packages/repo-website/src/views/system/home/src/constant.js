/* 导航栏 */
export const HeaderMenu = [
  { title: '首页', index: 0, name: 'Home' },
  { title: '产品', index: 1, name: 'Produce' },
  { title: '解决方案', index: 2, name: 'Solutions' },
  { title: '关于我们', index: 3, name: 'Around' },
]

/* 二级导航栏- 产品*/
export const subMenuPro = [
  { title: '互联网医院', name: 'NetHospital', index: 0, url: '1.jpg' },
  { title: '处方管理服务', name: 'Management', index: 1, url: '2.jpg' },
  { title: '药事管理服务', name: 'Pharmaceutical', index: 2, url: '3.jpg' },
  { title: '多店云仓配送', name: 'YunCang', index: 3, url: '4.jpg' },
]

/* 二级导航栏- 解决方案*/
export const subMenuSol = [
  { title: '互联网医院', name: 'Hospital', index: 0, url: '1.jpg' },
  { title: '药品配送', name: 'Delivery', index: 1, url: '2.jpg' },
  { title: '智能审方', name: 'Intelligent', index: 2, url: '3.jpg' },
  { title: '处方流转', name: 'Prescriptions', index: 3, url: '4.jpg' },
  { title: '药事服务', name: 'Medical', index: 4, url: '5.jpg' },
]

/** 审核状态 */
export const ENUM_CHECK_STATUS = {
  未申请: 1,
  待审核: 2,
  已通过: 3,
  未通过: 4,
}

export default {
  /** 导航栏 */
  HeaderMenu,
  /** 二级导航栏- 产品 */
  subMenuPro,
  /** 二级导航栏- 解决方案 */
  subMenuSol,
  /** 审核状态 */
  ENUM_CHECK_STATUS,
}
