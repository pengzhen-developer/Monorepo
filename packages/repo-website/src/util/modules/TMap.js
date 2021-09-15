export function TMap(key) {
  return new Promise((resolve, reject) => {
    window.init = () => {
      // eslint-disable-next-line no-undef
      resolve(qq) //注意这里
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://map.qq.com/api/js?v=2.exp&callback=init&libraries=place&key=${key}`
    script.onerror = reject
    document.head.appendChild(script)
  })
}
