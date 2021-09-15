import CONSTANT from './constant'

class Cache {
  constructor() {
    // localStorage、sessionStorage、memoryStorage、cookie
    // this.cacheMode = 'localStorage'
  }

  /**
   * 设置鉴权信息
   *
   * @param {*} auth
   * @returns
   */
  setAuth(auth) {
    return peace.cache.localStorage.set(CONSTANT.AUTH, auth)
  }

  /**
   * 获取鉴权信息
   *
   * @returns
   */
  getAuth() {
    return peace.cache.localStorage.get(CONSTANT.AUTH)
  }

  /**
   * 清空鉴权信息
   *
   */
  removeAuth() {
    peace.cache.localStorage.remove(CONSTANT.AUTH)
  }

  /**
   * 设置帐户信息
   *
   * @param {*} accountInfo 帐户信息
   * @returns
   */
  setAccountInfo(accountInfo) {
    return peace.cache.localStorage.set(CONSTANT.ACCOUNT_INFO, accountInfo)
  }

  /**
   * 获取帐户信息
   *
   * @returns
   */
  getAccountInfo() {
    return peace.cache.localStorage.get(CONSTANT.ACCOUNT_INFO)
  }

  /**
   * 清空帐户信息
   *
   */
  removeAccountInfo() {
    peace.cache.localStorage.remove(CONSTANT.ACCOUNT_INFO)
  }

  /**
   * 清空所有帐户信息
   *
   */
  removeAllAccountInfo() {
    peace.cache.localStorage.remove(CONSTANT.AUTH)

    peace.cache.localStorage.remove(CONSTANT.ACCOUNT_INFO)
    peace.cache.sessionStorage.remove(CONSTANT.ACCOUNT_MENU)
    peace.cache.sessionStorage.remove(CONSTANT.ACCOUNT_ROUTE)
  }

  /**
   * 设置账户菜单信息
   *
   * @param {*} accountMenu 账户菜单信息
   * @returns
   */
  setAccountMenu(accountMenu) {
    return peace.cache.sessionStorage.set(CONSTANT.ACCOUNT_MENU, accountMenu)
  }

  /**
   * 获取账户菜单信息
   *
   * @returns
   */
  getAccountMenu() {
    return peace.cache.sessionStorage.get(CONSTANT.ACCOUNT_MENU)
  }

  /**
   * 清空账户菜单信息
   *
   */
  removeAccountMenu() {
    peace.cache.sessionStorage.remove(CONSTANT.ACCOUNT_MENU)
  }

  /**
   * 设置账户路由信息
   *
   * @param {*} accountRoute 账户路由信息
   * @returns
   */
  setAccountRoute(accountRoute) {
    return peace.cache.sessionStorage.set(CONSTANT.ACCOUNT_ROUTE, accountRoute)
  }

  /**
   * 获取账户路由信息
   *
   * @returns
   */
  getAccountRoute() {
    return peace.cache.sessionStorage.get(CONSTANT.ACCOUNT_ROUTE)
  }

  /**
   * 清空账户路由信息
   *
   */
  removeAccountRoute() {
    peace.cache.sessionStorage.remove(CONSTANT.ACCOUNT_ROUTE)
  }
}

export default new Cache()
