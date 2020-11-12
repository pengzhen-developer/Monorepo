import { path } from '@src/router/generateRoutes'
import User from './user'

/**
 * 重定向到 path
 *
 * @param {string} URL 可选。打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口
 * @param {string} type 可选。指定target属性或窗口的名称。支持以下值：
                              _blank - URL加载到一个新的窗口。这是默认
                              _parent - URL加载到父框架
                              _self - URL替换当前页面
                              _top - URL替换任何可加载的框架集
                              name - 窗口名称
 * @param {string} specs 可选。一个逗号分隔的项目列表。
 * @param {string} replace 可选。Optional.Specifies规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：
                                true - URL 替换浏览历史中的当前条目。
                                false - URL 在浏览历史中创建新的条目。
 * @returns
 */
export const redirectToPath = (URL, name = '_self', specs, replace) => {
  window.open(URL, name, specs, replace)

  if (name === '_self') {
    throw new Error('等待重定向.......')
  }
}

/**
 * 重定向到索引页
 *
 * '/' 路由
 *
 */
export const redirectToIndex = () => {
  const URL = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH

  redirectToPath(URL)
}

/**
 * 重定向到首页
 *
 * '/home' 路由
 */
export const redirectToHome = () => {
  const URL = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'home'

  redirectToPath(URL)
}

/**
 * 重定向到登录页
 *
 * '/login' 路由
 */
export const redirectToLogin = () => {
  const URL = window.location.origin + process.env.VUE_APP_RELEASE_FLODER_PATH + 'login'

  redirectToPath(URL)
}

/**
 * 跳转控制台
 *
 */
export const redirectToConsole = async () => {
  const auth = await Peace.identity.auth.getAuth()
  const token = auth.access_token
  const path = process.env.VUE_APP_SITE_CONSOLE + '?token=' + token

  redirectToPath(path)
}

/**
 * 跳转医生工作台
 *
 */
export const redirectToDoctorWorkbench = () => {
  const URL = process.env.VUE_APP_SITE_DOCTOR_WORKBENCH

  redirectToPath(URL)
}
/**
 * 跳转药师工作台
 *
 */
export const redirectToPharmacistWorkbench = () => {
  const URL = process.env.VUE_APP_SITE_PHARMACIST_WORKBENCH

  redirectToPath(URL)
}

/**
 * 机构入驻跳转
 *
 */
export const redirectToCompliteInfo = (status) => {
  const checkStatus = {
    未申请: 1,
    待审核: 2,
    已通过: 3,
    未通过: 4
  }

  status = status || User.getUserInfo()?.checkStatus

  //重新提交则不跳转
  const resubmit = Peace.cache.sessionStorage.get('resubmit') ?? false

  switch (status) {
    case checkStatus.待审核:
      Peace.$router.replace(path.CHECKWAITING)
      break

    case checkStatus.未通过:
      if (!resubmit) {
        Peace.$router.replace(path.CHECKFAILURE)
      } else {
        Peace.cache.sessionStorage.remove('resubmit')
      }
      break

    case checkStatus.未申请:
      Peace.$router.replace(path.ORGREGISTER)
      break

    default:
      redirectToConsole()
      break
  }
}

export default {
  redirectToPath,

  redirectToIndex,
  redirectToHome,
  redirectToLogin,

  redirectToConsole,
  redirectToDoctorWorkbench,
  redirectToPharmacistWorkbench,
  redirectToCompliteInfo
}
