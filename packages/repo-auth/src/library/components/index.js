import { Table, TableColumn, Pagination } from './table'
import Countdown from './countdown'
import Dialog from './dialog'

const install = (Vue) => {
  Vue.component(Countdown.name, Countdown)

  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(Pagination.name, Pagination)

  Vue.component(Dialog.name, Dialog)
}

export default {
  install
}
