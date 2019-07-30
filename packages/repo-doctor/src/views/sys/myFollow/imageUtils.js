import axios from 'axios'
// import ImageServices from '@/services/others'
// const prefix = 'http://www.htcc.org.cn'

/* eslint-disable no-useless-escape */
const imgReg = /<img\ssrc=[\'\"]data:image.*?(?:>|\/>)/gi
const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i

// const setImgPrefix = content => {
//   return content.replace(/<img\ssrc=[\'\"]/gi, `<img src="${prefix}`)
// }

// 获取 图片Src 数组
const getImageSrcArray = content => {
  const arr = content.match(imgReg) || []
  const rsArr = []

  for (let [i, len] = [0, arr.length]; i < len; i += 1) {
    rsArr.push(arr[i].match(srcReg)[1])
  }

  return rsArr
}

// // 替换成 Src
const replaceImgSrc = (content, arr) => {
  content = content.replace(imgReg, '|')
  const _arr = content.split('|')
  const len = arr.length
  let _content = _arr[0]
  for (let i = 0; i < len; i += 1) {
    _content += `<img src="${arr[i]}">${_arr[i + 1]}`
  }
  return _content
}

// 创建请求组
const generateRequest = (params, call) => {
  const requestList = []

  for (let [i, len] = [0, params.length]; i < len; i += 1) {
    const func = call({ image: params[i] })
    requestList.push(func)
  }

  return requestList
}

/**
 *
 * @param {*} content
 * @param {*} func
 */
const formatImgSrc = (content, uploadApi) => {
  const srcArray = getImageSrcArray(content)
  console.log(srcArray)
  return axios.all(generateRequest(srcArray, uploadApi)).then(
    axios.spread((...args) => {
      const srcArr = args.map(val => val.data.fileName)
      return replaceImgSrc(content, srcArr)
    })
  )
}

export { formatImgSrc }
