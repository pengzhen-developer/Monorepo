/**
 * 按规则生成路由
 *
 * 一般情况下，只需要关注 generateRoutes-dynamic.js
 *
 * generateRoutes-dynamic 属于权限功能，访问需要认证和授权，因此挂载到 “AppIntercept” 组件下拦截鉴权
 * generateRoutes-static 属于系统级别功能，类似【登录】、【登出】、【欢迎页】，因此挂载到 “/”
 * generateRoutes-exception 属于错误分类功能，例如 【401】、【403】、【404】、【500】，因此挂载到 “/”
 *
 **/

import generateRoutesDynamic from './generateRoutes-dynamic'
import generateRoutesStatic from './generateRoutes-static'
import generateRoutesException from './generateRoutes-exception'

export default async function generateRoutes() {
  const routesDynamic = await generateRoutesDynamic()
  const routesStatic = await generateRoutesStatic()
  const routesException = await generateRoutesException()

  const routes = routesDynamic.concat(routesStatic).concat(routesException)

  return routes
}
