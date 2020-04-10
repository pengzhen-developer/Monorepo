export const path = {
  /** No Access */
  ['EXCEPTION-403']: '/exception/403',
  /** Not Exist */
  ['EXCEPTION-404']: '/exception/404',
  /** Server Error */
  ['EXCEPTION-500']: '/exception/500',
}

export default [
  {
    path: path['EXCEPTION-403'],
    name: path['EXCEPTION-403'],
    component: () => import('@src/views/exception/403'),
  },
  {
    path: path['EXCEPTION-404'],
    name: path['EXCEPTION-404'],
    component: () => import('@src/views/exception/404'),
  },
  {
    path: path['EXCEPTION-500'],
    name: path['EXCEPTION-500'],
    component: () => import('@src/views/exception/500'),
  },
  {
    path: '*',
    name: path['EXCEPTION-404'],
    component: () => import('@src/views/exception/404'),
  },
]
