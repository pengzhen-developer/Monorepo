import { MESSAGE_TYPE } from './enum'

function validatorType(one) {
  const types = Object.values(MESSAGE_TYPE)
  const typeSet = new Set(types)
  const result = typeSet.has(one.type)
  if (!result) {
    console.error(`JZT_CHAT: property 'type' should be included in MESSAGE_TYPE[${types.toString()}]`)
  }

  return result
}

export { validatorType }
