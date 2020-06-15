import Package from '@/package.json'

const COMPANY = 'holoalpha'
const APP_NAME = Package.name
const APP_VERSION = Package.version

const getSign = () => {
  return `[${COMPANY}]-[${APP_NAME}]-[${APP_VERSION}]`
}

export { getSign }

export default function(key) {
  const signKey = getSign()

  return `${signKey}:${key}`
}
