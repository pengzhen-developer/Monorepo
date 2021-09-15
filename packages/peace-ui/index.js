import { name, version } from './package.json'

import PeaceDialog from './packages/peace-dialog/index'
import PeaceButton from './packages/peace-button/index'
import PeaceInput from './packages/peace-input/index'
import PeaceSelect from './packages/peace-select/index'
import PeaceTable from './packages/peace-table/index'
import PeaceDatePicker from './packages/peace-date-picker/index'
import PeaceTimePicker from './packages/peace-time-picker/index'
import PeaceMultipleSelect from './packages/peace-multiple-select/index'
import PeaceTreeSelect from './packages/peace-tree-select/index'
import PeaceCountdown from './packages/peace-countdown/index'

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
