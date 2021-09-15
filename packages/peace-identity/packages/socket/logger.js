/**
 * shitty logger class
 */

class Logger {
  constructor() {
    this.debug = false
    this.prefix = `%cPeace.identity.socket`
  }

  info(text, data = '') {
    if (this.debug)
      window.console.info(`${this.prefix} - ${new Date().toLocaleString()} ` + `%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data)
  }

  error() {
    if (this.debug) window.console.error(`${this.prefix} - ${new Date().toLocaleString()} `, ...arguments)
  }

  warn() {
    if (this.debug) window.console.warn(`${this.prefix} - ${new Date().toLocaleString()} `, ...arguments)
  }

  event(text, data = '') {
    if (this.debug)
      window.console.info(`${this.prefix} - ${new Date().toLocaleString()} ` + `%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data)
  }
}

export default new Logger()
