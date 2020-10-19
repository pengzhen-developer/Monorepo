import { login } from './modules/login/index'
import user from './modules/user'
import referer from './modules/referer'
import route from './modules/route'

export default {
  login,

  /** 用户工具类 */
  user,

  /** 来源站点工具类 */
  referer,

  /** 路由工具类 */
  route
}
