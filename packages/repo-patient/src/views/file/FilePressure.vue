<template>
  <div class="file-pressure">

  </div>
</template>

<script>
function draw(heigh, low, sR, allCout) {
  if (sR < Math.PI / 2 || sR >= (3 / 2) * Math.PI) {
    return
  }
  heigh = heigh ? heigh : 0
  low = low ? low : 0
  var canvas = document.querySelector('#canvas'),
    cxt = canvas.getContext('2d'),
    cWidth = canvas.width,
    cHeight = canvas.height,
    baseColor = 'rgba(255, 255, 255, .3)',
    coverColor = '#fff',
    coverColor1 = '#fff'
  coverColors = '#fff'
  coverColors1 = '#fff'

  ;(PI = Math.PI), (sR = sR || (1 / 2) * PI) // 默认圆弧的起始点弧度为π/2

  var finalRadian = sR + ((PI + (PI - sR) * 2) * heigh) / allCout // 红圈的终点弧度
  var minRadian = sR + ((PI + (PI - sR) * 2) * low) / allCout // 红圈的终点弧度
  var step = (PI + (PI - sR) * 2) / allCout // 一个1%对应的弧度大小
  var text = 0 // 显示的数字
  var text1 = 0

  window.requestAnimationFrame(paint)

  function paint() {
    cxt.clearRect(0, 0, cWidth, cHeight)

    var qR = low / heigh
    var endRadian = sR + text * step
    var endRadian2 = sR + text * step * qR

    // 画灰色圆弧
    drawCanvas(cWidth / 2, cHeight / 2, 80, sR, sR + (PI + (PI - sR) * 2), baseColor, 5)
    // 画圆弧1
    drawCanvas(cWidth / 2, cHeight / 2, 80, sR, endRadian, coverColor, 5)
    // 画圆弧2
    drawCanvas(cWidth / 2, cHeight / 2, 80, sR, endRadian2, coverColor, 5)

    // 画进度圆头
    // 红色圆头其实就是一个圆，关键的是找到其圆心，涉及到三角函数知识，自己画个图一看就明了
    var angle = 2 * PI - endRadian // 转换成逆时针方向的弧度（三角函数中的）
    xPos = Math.cos(angle) * 80 + cWidth / 2 // 红色圆 圆心的x坐标
    yPos = -Math.sin(angle) * 80 + cHeight / 2 // 红色圆 圆心的y坐标
    drawCanvas(xPos, yPos, 2, 0, 2 * PI, coverColor, 10) //最后的参数10为圆头的大小
    //  源头里面再绘制一个小圆
    drawCanvas(xPos, yPos, 2, 0, 2 * PI, '#FF6A3D', 4)

    var angle = 2 * PI - endRadian2 // 转换成逆时针方向的弧度（三角函数中的）
    xPos = Math.cos(angle) * 80 + cWidth / 2 // 红色圆 圆心的x坐标
    yPos = -Math.sin(angle) * 80 + cHeight / 2 // 红色圆 圆心的y坐标
    drawCanvas(xPos, yPos, 2, 0, 2 * PI, coverColor, 10) //最后的参数10为圆头的大小
    //  源头里面再绘制一个小圆
    drawCanvas(xPos, yPos, 2, 0, 2 * PI, '#FF6A3D', 4)

    // 数字
    cxt.fillStyle = 'pink'
    cxt.font = '30px PT Sans'
    var textWidth = cxt.measureText(text + '%').width
    // cxt.fillText(text + '%', cWidth / 2 - textWidth / 2, cHeight / 2.5 + 15);
    text++

    if (endRadian.toFixed(2) < finalRadian.toFixed(2)) {
      window.requestAnimationFrame(paint)
    }
  }

  function drawCanvas(x, y, r, sRadian, eRadian, color, lineWidth) {
    cxt.beginPath()
    cxt.lineCap = 'round'
    cxt.strokeStyle = color
    cxt.lineWidth = lineWidth
    cxt.arc(x, y, r, sRadian, eRadian, false)
    cxt.stroke()
  }
}

export default {}
</script>

<style>
</style>