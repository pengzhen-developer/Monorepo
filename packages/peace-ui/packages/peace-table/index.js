import Table from './src/table'
import TableColumn from './src/table-column'
import TableColumnTree from './src/table-column-tree'

const install = (Vue) => {
  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(TableColumnTree.name, TableColumnTree)
}

export default {
  install
}
