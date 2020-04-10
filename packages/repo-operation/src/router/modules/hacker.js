export const path = {
  /**
   * 示例 1
   */
  DEMO1: '/hacker/demo/demo-1',

  /**
   * 开发者模式
   */
  DEV_TOOLS: '/hacker/developer-tools',
}

export default [
  {
    path: path.DEV_TOOLS,
    name: path.DEV_TOOLS,
    component: () => import('@src/views/hacker/devTools'),
  },
  {
    path: path.DEMO1,
    name: path.DEMO1,
    meta: {
      requireAuth: false,
    },
    component: () => import('@src/views/hacker/demo/demo1'),
  },
]
