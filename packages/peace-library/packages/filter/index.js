import numeral from 'numeral'
import dictionary from './../tools/util/dictionary'

const createFilter = ({ Vue }) => {
  // 数字格式化
  Vue.filter('filterNumeral', function(value, format) {
    return numeral(value).format(format)
  })

  // 字典格式化 - 精确匹配
  Vue.filter('filterDictionary', function(value, source, nullformat = '') {
    return dictionary.formatLabel(value, source, nullformat)
  })

  // 字典格式化 - 模糊匹配
  Vue.filter('filterDictionaryFuzzy', function(value, source, nullformat = '') {
    return dictionary.formatLabelFuzzy(value, source, nullformat)
  })

  // 字典格式化 - 精确匹配 Label
  Vue.filter('filterLabel', function(value, source, nullformat = '') {
    return dictionary.formatLabel(value, source, nullformat)
  })

  // 字典格式化 - 模糊匹配 Label
  Vue.filter('filterLabelFuzzy', function(value, source, nullformat = '') {
    return dictionary.formatLabelFuzzy(value, source, nullformat)
  })

  // 字典格式化 - 精确匹配 Value
  Vue.filter('filterValue', function(label, source, nullformat = '') {
    return dictionary.formatValue(label, source, nullformat)
  })

  // 字典格式化 - 模糊匹配 Value
  Vue.filter('filterValueFuzzy', function(label, source, nullformat = '') {
    return dictionary.formatValueFuzzy(label, source, nullformat)
  })

  // 金额格式化
  Vue.filter('filterCurrency', function(value) {
    return numeral(value).format('0,000.00')
  })
}

export default createFilter
