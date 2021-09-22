const hexToRGBA = function hexToRgbA(hex, opacity) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')

    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`
  }
  throw new Error('Bad Hex')
}

const createStyleConfig = (configuration) => {
  const styleConfig = new Map([
    ['primary', hexToRGBA(configuration.theme.primary, 1)],
    ['primary-light-1', hexToRGBA(configuration.theme.primary, 0.1)],
    ['primary-light-2', hexToRGBA(configuration.theme.primary, 0.2)],
    ['primary-light-3', hexToRGBA(configuration.theme.primary, 0.3)],
    ['primary-light-4', hexToRGBA(configuration.theme.primary, 0.4)],
    ['primary-light-5', hexToRGBA(configuration.theme.primary, 0.5)],
    ['primary-light-6', hexToRGBA(configuration.theme.primary, 0.6)],
    ['primary-light-7', hexToRGBA(configuration.theme.primary, 0.7)],
    ['primary-light-8', hexToRGBA(configuration.theme.primary, 0.8)],
    ['primary-light-9', hexToRGBA(configuration.theme.primary, 0.9)],

    ['grey-333', '#333333'],
    ['grey-666', '#666666'],
    ['grey-999', '#999999']
  ])

  return styleConfig
}

const generateStylesheet = (configuration) => {
  const styleConfig = createStyleConfig(configuration)

  // 生成 <stylesheet> 元素
  const stylesheet = document.createElement('style')
  stylesheet.type = 'text/css'

  // 写入说明
  stylesheet.appendChild(document.createTextNode('/* This is boot_styles auto generate */'))

  // 根据 config ，循环写入样式
  for (let [key, value] of styleConfig) {
    // 设定全局可访问变量
    // 使用 var(--q-color-xx) 访问
    document.body.style.setProperty('--q-color-' + key, value)

    // 设定全局样式
    const styleSheetNode = `.text-${key}{ color: ${value}; }.bg-${key}{ color: ${value}; }`

    // 写入 TextNode
    const styleSheetTextNode = document.createTextNode(styleSheetNode)

    // 写入 stylesheet
    stylesheet.appendChild(styleSheetTextNode)
  }

  // 将 <stylesheet> 元素加到页面中
  document.head.appendChild(stylesheet)
}

// export boot install function
// async is optional

export default async ({ configuration }) => {
  // 异步引入全局 css
  require(`@src/assets/css/index.scss`)

  // 基于配置生成 stylesheet, 写入 document.head
  generateStylesheet(configuration)

  // 还原 devicePixelRatio
  if (/windows|win32/i.test(navigator.userAgent)) {
    const devicePixelRatio = window.devicePixelRatio
    if (devicePixelRatio !== 1 && window.screen.width < 1440) {
      document.body.style.zoom = window.screen.width / 1440
    }
  }
}
