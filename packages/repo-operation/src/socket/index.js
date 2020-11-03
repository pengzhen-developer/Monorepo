import SocketGenerate from './socket-generate'

export default async function() {
  if (Peace.identity.auth.isLogin()) {
    SocketGenerate()
  }
}
