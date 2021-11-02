import platform from './platform'

import base64 from './base64'
import tool from './tool'
import message from './message'
import format from './format'
import dictionary from './dictionary'

export default {
  platform,

  ...tool,
  ...base64,
  ...message,
  ...format,
  ...dictionary
}
