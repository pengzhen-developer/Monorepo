// alias.config.js 用于WebStorm 识别配置
function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 *     .set('@public', path.join(__dirname, 'public'))
       .set('@src', path.join(__dirname, 'src'))
       .set('@views', path.join(__dirname, 'src/views'))
       .set('@service', path.join(__dirname, 'src/service'))
 * @type {{resolve: {alias: {"@"}}}}
 */
module.exports = {
  resolve: {
    alias: {
      '@public': resolve('public'),
      '@src': resolve('src'),
      '@views': resolve('src/views'),
      '@service': resolve('src/service'),
    }
  }
}
