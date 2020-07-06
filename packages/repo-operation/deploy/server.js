/*
 *读取env环境变量
 */

const fs = require('fs')
const path = require('path')

/** 环境变量 */
const env = process.env.NODE_ENV

/*
 * 定义服务器连接
 * 根据 env 获取当前环境变量服务器账号
 */
const SERVER_LIST = {
  dev: {
    name: '开发环境',
    domain: 'https://devoperate.holoalpha.com/web',
    host: '119.3.60.72',
    port: 2212,
    username: 'root',
    password: 'Q!s4EezzIBPpqcmQ',
    path: '/data/wwwroot/zycloud/zycloud_operate/public/web'
  },

  test: {
    name: '测试环境',
    domain: 'https://testoperate.holoalpha.com/web',
    host: '122.112.213.196',
    port: 2212,
    username: 'root',
    password: 'L0QZKNbxt8T8tl@E',
    path: '/data/wwwroot/zycloud/zycloud_operate/public/web'
  }
}

module.exports = SERVER_LIST[env]
