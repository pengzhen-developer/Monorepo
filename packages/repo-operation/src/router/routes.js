// Import system router
import system from './modules/system'
import hacker from './modules/hacker'
import exception from './modules/exception'

import account from './modules/account'
import service from './modules/service'

const routes = [...system, ...hacker, ...exception, ...account, ...service]

export default routes
