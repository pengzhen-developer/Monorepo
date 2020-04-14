// Import system router
import system from './modules/system'
import hacker from './modules/hacker'
import exception from './modules/exception'

import account from './modules/account'

const routes = [...system, ...hacker, ...exception, ...account]

export default routes
