/* eslint-disable */

/*
 * @Desc: slide ruler
 * @Author: simbawu
 * @Date: 2019-04-16 20:15:13
 * @LastEditors: simbawu
 * @LastEditTime: 2019-08-07 14:00:00
 */
import s from './slide-ruler.scss'

class sliderRuler {
  constructor(options = {}) {
    this.value = ''
    this.options = {
      canvasWidth: document.body.clientWidth || 375,
      canvasHeight: 83,
      boxColor: '#E4E4E4',
      scrollLeft: 0,
      heightDecimal: 35,
      heightDigit: 18,
      lineWidth: 2,
      colorDecimal: '#E4E4E4',
      colorDigit: '#E4E4E4',
      divide: 10,
      precision: 1,
      fontSize: 20,
      fontColor: '#666',
      fontMarginTop: 35,
      maxValue: 230,
      minValue: 100,
      currentValue: 160
    }

    this.localState = {
      startX: 0,
      startY: 0,
      isTouchEnd: true,
      touchPoints: []
    }

    this.browserEnv = window.hasOwnProperty('ontouchstart')

    this.options = { ...this.options, ...options }

    this.init(this.options)
  }

  _renderBox(container) {
    const box = document.createElement('div'),
      canvas = document.createElement('canvas')
    this.canvas = canvas
    box.className = s.box
    box.appendChild(canvas)
    container.appendChild(box)
    this._renderCanvas()
  }

  _renderCanvas() {
    const { canvasWidth, canvasHeight } = this.options,
      canvas = this.canvas
    canvas.width = canvasWidth * 2
    canvas.height = canvasHeight * 2
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'
    canvas.className = s.canvas
    if (this.browserEnv) {
      canvas.ontouchstart = this.touchStart.bind(this)
      canvas.ontouchmove = this.touchMove.bind(this)
      canvas.ontouchend = this.touchEnd.bind(this)
    } else {
      canvas.onmousedown = this.touchStart.bind(this)
      canvas.onmousemove = this.touchMove.bind(this)
      canvas.onmouseup = this.touchEnd.bind(this)
    }
    this.dreawCanvas()
  }

  touchStart(e) {
    e.preventDefault()
    if (e || this.localState.isTouchEnd) {
      this.touchPoints(e)
      let touch = (e.touches && e.touches[0]) || e
      this.localState.startX = touch.pageX
      this.localState.startY = touch.pageY
      this.localState.startT = new Date().getTime() // ?????????????????????????????????
      this.localState.isTouchEnd = false // ??????????????????
    }
  }

  touchMove(e) {
    if (!this.browserEnv && (e.which !== 1 || e.buttons === 0)) return // pc canvas??????????????????
    this.touchPoints(e)
    let touch = (e.touches && e.touches[0]) || e,
      deltaX = touch.pageX - this.localState.startX,
      deltaY = touch.pageY - this.localState.startY
    // ??????X????????????????????????Y?????????????????????????????????
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(Math.round(deltaX / this.options.divide)) > 0
    ) {
      if (this.browserEnv && !this.rebound(deltaX)) {
        return
      }
      this.moveDreaw(deltaX)
      this.localState.startX = touch.pageX
      this.localState.startY = touch.pageY
    }
  }

  touchEnd() {
    this.moveDreaw(this.browserEnv ? this.inertialShift() : 0)
    this.localState.isTouchEnd = true
    this.localState.touchPoints = []
    this.canvas.style.transform = 'translate3d(0, 0, 0)'
  }

  touchPoints(e) {
    let touch = (e.touches && e.touches[0]) || e,
      time = new Date().getTime(),
      shift = touch.pageX
    this.localState.touchPoints.push({ time: time, shift: shift })
  }

  inertialShift() {
    let s = 0
    if (this.localState.touchPoints.length >= 4) {
      let _points = this.localState.touchPoints.slice(-4),
        v = ((_points[3].shift - _points[0].shift) / (_points[3].time - _points[0].time)) * 1000 // v ??????????????????????????????px/s
      const a = 12000 // a ?????????????????????????????????
      s = (Math.sign(v) * Math.pow(v, 2)) / (2 * a) // s ?????????????????????????????????
    }
    return s
  }

  rebound(deltaX) {
    const { currentValue, maxValue, minValue } = this.options
    if ((currentValue === minValue && deltaX > 0) || (currentValue === maxValue && deltaX < 0)) {
      let reboundX = Math.sign(deltaX) * 1.5988 * Math.pow(Math.abs(deltaX), 0.7962)
      this.canvas.style.transform = `translate3d(${reboundX}px, 0, 0)`
      return false
    }
    return true
  }

  moveDreaw(shift) {
    const { divide, precision } = this.options
    let moveValue = Math.round(-shift / divide),
      _moveValue = Math.abs(moveValue),
      draw = () => {
        if (_moveValue < 1) {
          return
        }
        this.options.currentValue += Math.sign(moveValue) * precision
        this.dreawCanvas()
        window.requestAnimationFrame(draw)
        _moveValue--
      }

    draw()
  }

  dreawCanvas() {
    const canvas = this.canvas,
      context = canvas.getContext('2d')
    canvas.height = canvas.height
    let {
      canvasWidth,
      canvasHeight,
      maxValue,
      minValue,
      currentValue,
      handleValue,
      precision,
      divide,
      heightDecimal,
      heightDigit,
      lineWidth,
      colorDecimal,
      colorDigit,
      fontSize,
      fontColor,
      fontMarginTop
    } = this.options
    // ???????????????
    currentValue =
      currentValue > minValue ? (currentValue < maxValue ? currentValue : maxValue) : minValue
    currentValue = (Math.round((currentValue * 10) / precision) * precision) / 10
    this.options.currentValue = currentValue
    handleValue && handleValue(currentValue)
    let diffCurrentMin = ((currentValue - minValue) * divide) / precision,
      startValue = currentValue - Math.floor(canvasWidth / 2 / divide) * precision
    startValue = startValue > minValue ? (startValue < maxValue ? startValue : maxValue) : minValue
    let endValue = startValue + (canvasWidth / divide) * precision
    endValue = endValue < maxValue ? endValue : maxValue
    // ????????????
    let origin = {
      x:
        diffCurrentMin > canvasWidth / 2
          ? (canvasWidth / 2 - ((currentValue - startValue) * divide) / precision) * 2
          : (canvasWidth / 2 - diffCurrentMin) * 2,
      y: canvasHeight * 2
    }
    // ?????????????????????
    heightDecimal = heightDecimal * 2
    heightDigit = heightDigit * 2
    lineWidth = lineWidth * 2
    // ????????????????????????
    fontSize = fontSize * 2
    fontMarginTop = fontMarginTop * 2
    // ????????????????????????px
    divide = divide * 2
    // ???????????????????????????
    const derivative = 1 / precision

    for (let i = Math.round((startValue / precision) * 10) / 10; i <= endValue / precision; i++) {
      context.beginPath()
      // ????????????
      context.moveTo(origin.x + (i - startValue / precision) * divide, 0)
      // ????????????????????????10??????????????????
      context.lineTo(
        origin.x + (i - startValue / precision) * divide,
        i % 10 === 0 ? heightDecimal : heightDigit
      )
      context.lineWidth = lineWidth
      // 10??????????????????
      context.strokeStyle = i % 10 === 0 ? colorDecimal : colorDigit
      context.stroke()
      // ???????????????
      context.fillStyle = fontColor
      context.textAlign = 'center'
      context.textBaseline = 'top'
      if (i % 10 === 0) {
        context.font = `${fontSize}px Arial`
        context.fillText(
          Math.round(i / 10) / (derivative / 10),
          origin.x + (i - startValue / precision) * divide,
          fontMarginTop
        )
      }
      context.closePath()
    }
  }

  init(options) {
    this._renderBox(options.el)
  }
}

export default sliderRuler
