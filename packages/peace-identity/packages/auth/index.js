import createHttp from './lib/http'
import Cache from './lib/cache'
import { encryption } from './lib/encryption.js'
import CONSTANT from './lib/constant'

export default class Auth {
  // single instance
  static getInstance(options) {
    if (!Auth.instance) {
      Auth.instance = new Auth(options)

      return Auth.instance
    }
    return Auth.instance
  }

  constructor(config) {
    this.config = config
    this.http = createHttp()

    //  set header
    if (this.isLogin()) {
      const res = Cache.getAuth()

      this.setHeaderAfterAuth(res.access_token)
    }
  }

  /**
   * 配置请求头( 认证前 )
   *
   * @param {*} client_id       终端id
   * @param {*} client_secret   终端secret
   */
  _setHeaderBeforeAuth(params) {
    return new Promise((resolve) => {
      let { client_id, client_secret } = params
      //未登录 Authorization='Basic '+ client_id:client_secret（base64加密）
      this.http.defaults.headers.common['Authorization'] = CONSTANT.LOGIN_AUTH_TYPE + peace.util.encode(client_id + ':' + client_secret)
      this.http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
      resolve()
    })
  }

  /**
   * 密码登陆
   * @param {*} params
   */
  _loginByPassword(params) {
    this._setHeaderBeforeAuth(params)

    let user = peace.util.deepClone(params)

    let password = encryption({
      data: { password: user.password },
      key: user.encryption_key,
      param: ['password']
    })

    return this.http.request({
      method: 'post',
      url: this.config.baseApi + 'auth/oauth/token',
      params: { grant_type: 'password' },
      data: {
        username: user.username,
        password: password.password
      },
      transformRequest: [
        (data) => {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ]
    })
  }

  /**
   * 手机登录
   * @param {*} params
   */
  _loginByMobile(params) {
    this._setHeaderBeforeAuth(params)

    let user = peace.util.deepClone(params)

    return this.http.request({
      method: 'post',
      url: this.config.baseApi + 'auth/mobile/token/sms',
      params: { mobile: user.mobile, code: user.code, grant_type: 'mobile' }
    })
  }

  /**
   * 登录
   *
   * @param {*} client_id       终端id
   * @param {*} client_secret   终端secret
   * @param {*} grant_type      登录模式 password:密码  mobile:手机
   * @param {*} username        用户名（grant_type=password 时必填）
   * @param {*} password        密码（grant_type=password 时必填）
   * @param {*} encryption_key  加密key（grant_type=password 时必填）
   * @param {*} mobile          手机号（grant_type=mobile 时必填）
   * @param {*} code            验证码（grant_type=mobile 时必填）
   */
  login(params) {
    return new Promise((resolve, reject) => {
      if (params.client_id && params.client_secret) {
        if (params.grant_type === 'password') {
          this._loginByPassword(params).then(
            (res) => {
              this.setAuth(res.data)
              this.setHeaderAfterAuth(res.data.access_token)
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        } else if (params.grant_type === 'mobile') {
          this._loginByMobile(params).then(
            (res) => {
              this.setAuth(res.data)
              this.setHeaderAfterAuth(res.data.access_token)
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          reject({
            code: 201,
            msg: '登陆模式错误！',
            data: null
          })
        }
      } else {
        reject({
          code: 201,
          msg: '终端参数错误！',
          data: null
        })
      }
    })
  }

  /**
   * 判断登录状态
   */
  isLogin() {
    return Cache.getAuth() ? true : false
  }

  /**
   * 配置请求头( 认证后 )
   */
  setHeaderAfterAuth(token) {
    peace.http.defaults.headers.common['Authorization'] = CONSTANT.REQUEST_AUTH_TYPE + token
    peace.http.defaults.headers.common['Content-Type'] = 'application/json'
    return peace.http.defaults.headers.common
  }

  /**
   * 登出
   */
  logout() {
    return new Promise((resolve, reject) => {
      peace.http.delete(this.config.baseApi + 'auth/token/logout').then(
        (res) => {
          this.removeAll()
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  /**
   * 获取鉴权信息
   */
  getAuth() {
    return new Promise((resolve) => {
      resolve(Cache.getAuth())
    })
  }

  /**
   * 设置鉴权信息
   */
  setAuth(auth) {
    Cache.setAuth(auth)
    return auth
  }

  /**
   * 清空鉴权信息
   */
  removeAuth() {
    Cache.removeAuth()
    return true
  }

  /**
   * 获取用户信息
   */
  getAccountInfo() {
    return new Promise((resolve, reject) => {
      let accountInfo = Cache.getAccountInfo()
      if (accountInfo) {
        resolve(accountInfo)
      } else {
        peace.http.get(this.config.baseApi + 'admin/user/getUserInfo').then(
          (res) => {
            Cache.setAccountInfo(res.data)
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  /**
   * 设置用户信息
   */
  setAccountInfo(accountInfo) {
    Cache.setAccountInfo(accountInfo)
    return accountInfo
  }

  /**
   * 清空用户信息
   */
  removeAccountInfo() {
    Cache.removeAccountInfo()
    return true
  }

  /**
   * 获取用户菜单
   *
   * @param {*} productCode   产品编码
   * @param {*} type          菜单类型 left：左菜单, top：顶菜单, button：按钮   目前默认为left
   * @param {*} processEnv    环境变量 process.env  用于处理iframe
   * // 环境变量 process.env  用于处理iframe
   * // ## 处方共享管理、合理用药管理、药品供应管理 地址
   * // VUE_APP_PRESCRIPTION_SITE = 'https://devdurhome.imedcloud.jk.com/'
   * // ## 互联网医院 地址
   * // VUE_APP_ORGANIZATION_SITE='https://devapi.holoalpha.com/mechanism/#/'
   */
  getAccountMenu(params) {
    return new Promise((resolve, reject) => {
      let accountMenu = Cache.getAccountMenu()
      if (accountMenu) {
        resolve(accountMenu)
      } else {
        params = Object.assign(
          {},
          {
            // 菜单类型 left：左菜单, top：顶菜单, button：按钮   目前默认为left
            type: 'left',
            processEnv: {}
          },
          params
        )
        peace.http.get(this.config.baseApi + 'admin/menu/userMenuOfList', { params }).then(
          (res) => {
            const adpaterMenuList = []

            res.data.forEach((menu) => {
              if (menu.menuRoutes) {
                if (menu.menuRoutes.length == 0) {
                  const menuStruct = {}
                  menuStruct.menuIcon = menu.icon
                  menuStruct.menuName = menu.name
                  menuStruct.id = menu.menuId.toString()
                  menuStruct.parentId = menu.parentId.toString()
                  menuStruct.sort = menu.sort

                  menuStruct.closable = true
                  menuStruct.enable = true
                  menuStruct.menuAlias = menu.name
                  menuStruct.menuPath = ''
                  menuStruct.menuRoute = ''

                  menuStruct.virtual = 0
                  adpaterMenuList.push(menuStruct)
                } else {
                  const regx = /\{(.+?)\}/g

                  menu.menuRoutes.forEach((route) => {
                    const menuStruct = {}

                    // 处理 env
                    // {env} => process.env.env
                    let envKey = route.realPath && route.realPath.match(regx) && route.realPath.match(regx)[0]
                    envKey = envKey && envKey.replace(/(^\{)|(\}$)/g, '')
                    if (params.processEnv[envKey]) {
                      route.realPath = route.realPath && route.realPath.replace(regx, params.processEnv[envKey])
                    } else {
                      if (envKey) {
                        console.warn(`processEnv中未找到环境变量${envKey}`)
                      }
                    }

                    menuStruct.menuIcon = menu.icon
                    menuStruct.menuName = route.name
                    menuStruct.id = route.routeType === 1 ? menu.menuId.toString() : (menu.menuId + '-' + route.routeId).toString()
                    menuStruct.parentId = menu.parentId.toString()
                    menuStruct.sort = menu.sort

                    menuStruct.closable = route.closable == 1 ? true : false
                    menuStruct.enable = route.enable == 1 ? true : false
                    menuStruct.menuAlias = route.routeName
                    menuStruct.menuPath = route.realPath
                    menuStruct.menuRoute = route.routePath
                    menuStruct.menuElements = menu.menuElements

                    menuStruct.virtual = route.routeType === 1 ? 0 : 1

                    adpaterMenuList.push(menuStruct)
                  })
                }
              }
            })

            //sort排序
            adpaterMenuList.sort((a, b) => {
              return a.sort - b.sort
            })

            Cache.setAccountMenu(adpaterMenuList)
            resolve(adpaterMenuList)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  /**
   * 设置用户菜单
   */
  setAccountMenu(accountMenu) {
    Cache.setAccountMenu(accountMenu)
    return accountMenu
  }

  /**
   * 清空用户菜单
   */
  removeAccountMenu() {
    Cache.removeAccountMenu()
    return true
  }

  /**
   * 清空auth相关所有信息
   */
  removeAll() {
    Cache.removeAllAccountInfo()
    return true
  }

  /**
   * 工作流
   *
   * @param {*} client_id       终端id
   * @param {*} client_secret   终端secret
   * @param {*} grant_type      登录模式 password:密码  mobile:手机
   * @param {*} username        用户名（grant_type=password 时必填）
   * @param {*} password        密码（grant_type=password 时必填）
   * @param {*} encryption_key  加密key（grant_type=password 时必填）
   * @param {*} mobile          手机号（grant_type=mobile 时必填）
   * @param {*} code            验证码（grant_type=mobile 时必填）
   * @param {*} productCode     产品编码(可选，不填默认取配置项)
   * @param {*} type            菜单类型 left：左菜单, top：顶菜单, button：按钮   目前默认为left
   * @param {*} processEnv      环境变量 process.env  用于处理iframe
   * // 环境变量 process.env  用于处理iframe
   * // ## 处方共享管理、合理用药管理、药品供应管理 地址
   * // VUE_APP_PRESCRIPTION_SITE = 'https://devdurhome.imedcloud.jk.com/'
   * // ## 互联网医院 地址
   * // VUE_APP_ORGANIZATION_SITE='https://devapi.holoalpha.com/mechanism/#/'
   */
  workFlowAuth(params) {
    return new Promise((resolve, reject) => {
      this._setHeaderBeforeAuth(params)
        .then(() => {
          return this.login(params)
        })
        .then((res) => {
          return this.setAuth(res.data)
        })
        .then(() => {
          let token = Cache.getAuth().access_token
          return this.setHeaderAfterAuth(token)
        })
        .then(() => {
          return this.getAccountInfo()
        })
        .then(() => {
          return this.getAccountMenu(params)
        })
        .then(() => {
          let auth = this.getAuth()
          let accountInfo = this.getAccountInfo()
          let accountMenu = this.getAccountMenu()
          let result = { auth, accountInfo, accountMenu }
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
