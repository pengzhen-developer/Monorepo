import util from './util/index'
import validate from './validate/index'
import cache from './cache/index'

import dayjs from './dayjs/index'
import numeral from './numeral/index'

const createTools = () => {
  return {
    util,
    validate,
    cache,

    dayjs,
    numeral
  }
}

export default createTools
