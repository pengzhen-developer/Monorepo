import { name, version } from './../package.json'

import PeaceDialog from './peace-dialog/index'
import PeaceButton from './peace-button/index'
import PeaceInput from './peace-input/index'
import PeaceSelect from './peace-select/index'
import PeaceTable from './peace-table/index'
import PeaceDatePicker from './peace-date-picker/index'
import PeaceTimePicker from './peace-time-picker/index'
import PeaceMultipleSelect from './peace-multiple-select/index'
import PeaceTreeSelect from './peace-tree-select/index'
import PeaceCountdown from './peace-countdown/index'

// import './../assets/css/index.scss'

const install = (Vue) => {
  Vue.use(PeaceDialog)
  Vue.use(PeaceButton)
  Vue.use(PeaceInput)
  Vue.use(PeaceSelect)
  Vue.use(PeaceTable)
  Vue.use(PeaceDatePicker)
  Vue.use(PeaceTimePicker)
  Vue.use(PeaceMultipleSelect)
  Vue.use(PeaceTreeSelect)
  Vue.use(PeaceCountdown)

  console.log(
    `%c ${name} %c ${version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}

export default {
  install,

  name,
  version
}
