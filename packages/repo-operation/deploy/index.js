const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const server = require('./server')

const spinner = ora(`Deploying for ${process.env.NODE_ENV}... `)
spinner.start()

/** scp 待传输文件夹 ： 即 vue build 生成的目录 */
const scpPath = 'dist/'

/** scp 连接配置 */
const scpConnectConfig = {
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password,
  path: server.path
}

/** scp 准备传输 */
scpClient.scp(scpPath, scpConnectConfig, (err) => {
  spinner.stop()

  if (err) {
    const errorMessage = `Deploy failed.`

    console.log(`${chalk.bgRed(' ERROR ')} ${errorMessage}`)
    throw err
  } else {
    const doneMessage = `Deploy complete. The ${chalk.cyan('dist')} directory is deployed at ${chalk.cyan(server.host)}${chalk.cyan(server.path)}.`
    const infoMessage = `Check out at ${chalk.cyan(server.domain)}.`

    console.log(`${chalk.bgGreen.black(' DONE ')} ${doneMessage}`)
    console.log(`${chalk.bgBlue.black(' INFO ')} ${infoMessage}`)
  }
})
