import DictionaryService from './dictionary-service'

export default class Dictionary {
  // single instance
  static getInstance(options) {
    if (!Dictionary.instance) {
      Dictionary.instance = new Dictionary(options)

      return Dictionary.instance
    }
    return Dictionary.instance
  }

  constructor(config) {
    this.config = config
    this.DictionaryService = new DictionaryService(config)
  }

  getMap(type) {
    if (type) {
      return this.DictionaryService.GET({ type }).then((res) => {
        const map = {}

        res.data.forEach((item) => {
          const key = item.value
          const value = item

          map[key] = value
        })

        return map
      })
    } else {
      throw new Error('Type is required')
    }
  }

  getList(type) {
    if (type) {
      return this.DictionaryService.GET({ type }).then((res) => {
        const list = res.data

        return list
      })
    } else {
      throw new Error('Type is required')
    }
  }

  filterDictionary(value, source, nullformat = '') {
    if (Array.isArray(source)) {
      const item = source.find((item) => item.value === value)

      return item ? item.label : nullformat
    } else {
      const item = source[value]
      return item ? item.label : nullformat
    }
  }

  listToMap(list) {
    const map = {}

    list.forEach((item) => {
      const key = item.value
      const value = item

      map[key] = value
    })

    return map
  }

  mapToList(map) {
    const list = []

    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        const item = map[key]

        list.push(item)
      }
    }

    return list
  }
}
