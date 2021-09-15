/**
 * 格式化为 Label - 精确匹配
 *
 * @export
 * @returns
 */
export function formatLabel(value, source, nullformat = '') {
  const item = source.find((item) => item.value === value)
  return item ? item.label : nullformat
}

/**
 * 格式化为 Label - 模糊匹配
 *
 * @export
 * @returns
 */
export function formatLabelFuzzy(value, source, nullformat = '') {
  const item = source.find((item) => item.value == value)
  return item ? item.label : nullformat
}

/**
 * 格式化为 Value - 精确匹配
 *
 * @export
 * @returns
 */
export function formatValue(label, source, nullformat = '') {
  const item = source.find((item) => item.label === label)
  return item ? item.value : nullformat
}

/**
 * 格式化为 Value - 模糊匹配
 *
 * @export
 * @returns
 */
export function formatValueFuzzy(label, source, nullformat = '') {
  const item = source.find((item) => item.label == label)
  return item ? item.value : nullformat
}

export default {
  formatLabel,
  formatLabelFuzzy,

  formatValue,
  formatValueFuzzy
}
