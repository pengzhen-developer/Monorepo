/**
 * 是否显示受控区域
 * @param {controlledSign} String
 * @param {controlledMenuList} Array
 *
 */
export const canShowcard = (controlledSign, controlledMenuList) => {
  return controlledMenuList?.find((menu) => menu.controlledSign == controlledSign) ? true : false
}
/**
 * 受控区域点击跳转
 *@param {controlledSign} String
 *@param {query} Object
 *@param {controlledMenuList} Array
 */
export const gotoPage = (controlledSign, query = {}, controlledMenuList) => {
  const menuName = controlledMenuList?.find((menu) => menu.controlledSign == controlledSign)?.menuRoutes.find((childMenu) => childMenu.routeType == 1)
    ?.routeName

  Peace.$router.push({ name: menuName, query: query })
}

export default {
  canShowcard,
  gotoPage
}
