import Vue from 'vue'

Vue.filter('getEnumLabel', function(value, ENUM) {
  return Object.keys(ENUM).find((key) => ENUM[key] === value)
})
