import Package from '@/package.json'

const COMPANY = 'holoalpha'
const APP_NAME = Package.name
const APP_VERSION = Package.version

const getSign = () => {
  return `${COMPANY}-${APP_NAME}-v${APP_VERSION}`
}

export { getSign }

export default function(key) {
  const signKey = getSign()

  return `${signKey}:${key}`
}
