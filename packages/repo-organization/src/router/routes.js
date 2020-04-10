// Import system router
import system from './modules/system'
import hacker from './modules/hacker'

import exception from './modules/exception'

const routes = [...system, ...hacker, ...exception]

export default routes
