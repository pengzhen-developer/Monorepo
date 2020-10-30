import generateSocket from './generateSocket'

export default async function() {
  if (Peace.identity.auth.isLogin()) {
    generateSocket()
  }
}
