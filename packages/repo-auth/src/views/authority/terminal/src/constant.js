export default {
  authorizedGrantTypes: [
    { key: '密码模式', value: 'password' },
    { key: '授权码模式', value: 'authorization_code' },
    { key: '客户端模式', value: 'client_credentials' },
    { key: '刷新模式', value: 'refresh_token' },
    { key: '简化模式', value: 'implicit' }
  ],
  authorizedGrantTypeObj: {
    password: '密码模式',
    authorization_code: '授权码模式',
    client_credentials: '客户端模式',
    refresh_token: '刷新模式',
    implicit: '简化模式'
  }
}
