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

// export boot install function
// async is optional

export default async ({ configuration }) => {
  require(`@src/assets/css/ui-fix.scss`)

  const styleConfig = new Map([
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

  const style = document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode('/* This is boot_styles auto generate */'))

  for (let [key, value] of styleConfig) {
    document.body.style.setProperty('--q-color-' + key, value)
    const styleSheetNode = `.text-${key}{ color: ${value}; }.bg-${key}{ color: ${value}; }`
    const styleSheetTextNode = document.createTextNode(styleSheetNode)
    style.appendChild(styleSheetTextNode)
  }

  // 将 <style> 元素加到页面中
  document.head.appendChild(style)

  console.log(
    `%c ${'Styles'} %c N/A %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
