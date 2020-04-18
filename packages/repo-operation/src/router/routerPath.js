// Import path config
import { path as hacker } from './modules/hacker'
import { path as system } from './modules/system'
import { path as exception } from './modules/exception'

import { path as account } from './modules/account'
import { path as service } from './modules/service'

const routerPath = {
  hacker,
  system,
  exception,

  account,
  service,
}

export default routerPath
