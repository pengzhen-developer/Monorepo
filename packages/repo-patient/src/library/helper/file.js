/**
 * url to image Object
 *
 * @export
 * @param {*} url 图片路径
 * @param {*} fn 回调方法
 */
export function urlToImage(url, fn) {
  var img = new Image()
  img.src = url
  img.onload = function() {
    fn && fn(img)
  }
}

/**
 * image object to canvas
 *
 * @param {*} image 图片对象
 * @returns
 */
export function imageToCanvas(image) {
  var cvs = document.createElement('canvas')
  var ctx = cvs.getContext('2d')
  cvs.width = image.width
  cvs.height = image.height
  ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
  return cvs
}

/**
 * canvas to image with resize
 *
 * @param {*} canvas canvas 对象
 * @param {*} quality 压缩倍率
 * @param {*} fn 回调方法
 */
export function canvasResizetoFile(canvas, quality, fn) {
  canvas.toBlob(
    function(blob) {
      fn && fn(blob)
    },
    'image/png',
    quality
  )
}

/**
 * canvas to dataURL with resize
 *
 * @export
 * @param {*} canvas
 * @param {*} quality
 * @param {*} fn
 */
export function canvasResizetodataURL(canvas, quality, fn) {
  const dataURLObject = canvas.todataURL('image/jpeg', quality)

  fn && fn(dataURLObject)
}

/**
 * file to dataURL
 *
 * @export
 * @param {*} file
 * @param {*} fn
 */
export function fileTodataURL(file, fn) {
  var reader = new FileReader()
  reader.onloadend = function(e) {
    fn && fn(e.target.result)
  }
  reader.readAsDataURL(file)
}

/**
 * dataURL to image
 *
 * @export
 * @param {*} dataURL
 * @param {*} fn
 */
export function dataURLToImage(dataURL, fn) {
  var img = new Image()
  img.onload = function() {
    fn && fn(img)
  }
  img.src = dataURL
}

/**
 * dataURL to file
 *
 * @export
 * @param {*} dataURL
 * @returns
 */
export function dataURLToFile(dataURL) {
  var arr = dataURL.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * file resize to file
 *
 * @export
 * @param {*} file 图片对象
 * @param {*} quality 压缩比
 * @param {*} fn 回调方法
 */
export function fileResizeToFile(file, quality = 0.8, fn = () => {}) {
  fileTodataURL(file, function(dataURL) {
    dataURLToImage(dataURL, function(image) {
      canvasResizetoFile(imageToCanvas(image), quality, fn)
    })
  })
}

export default {
  urlToImage,
  imageToCanvas,
  canvasResizetoFile,
  canvasResizetodataURL,
  fileTodataURL,
  dataURLToImage,
  dataURLToFile,
  fileResizeToFile
}
