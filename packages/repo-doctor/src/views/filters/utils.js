const getLabelByValue = (status, array, value, label) => {
  if (status === undefined || status === null) return status
  const arr = array
  const len = arr.length

  for (let i = 0; i < len; i++) {
    if (arr[i][value] === status) {
      return arr[i][label]
    }
  }
  return status
}


export { getLabelByValue }

export default {}
