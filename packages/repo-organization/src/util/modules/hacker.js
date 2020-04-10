import router from '@src/router'
import routerPath from '@src/router/routerPath'

let hackerClickCount = 0
let currentHackerTimestamp = 0
let lastHackerTimestamp = 0

/**
 * 验证是否开发者
 *
 * @returns
 */
export const isDeveloper = () => {
  currentHackerTimestamp = new Date().getTime()

  if (currentHackerTimestamp - lastHackerTimestamp < 500) {
    hackerClickCount += 1
  } else {
    hackerClickCount = 0
  }

  lastHackerTimestamp = currentHackerTimestamp

  if (hackerClickCount >= 10) {
    hackerClickCount = 0

    return true
  }

  return false
}

/**
 * 跳转开发者页面
 *
 * @returns
 */
export const redirectToDevTools = () => {
  return router.router.push(routerPath.hacker.DEV_TOOLS)
}

export default {
  isDeveloper,
  redirectToDevTools
}
