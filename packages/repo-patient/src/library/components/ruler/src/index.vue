<template>
  <div class="ruler">
    <div class="ruler-canvas"></div>
  </div>
</template>

<script>
import Ruler from './slide-ruler'

export default {
  name: 'peace-ruler',

  props: {
    /** 当前值 */
    value: {
      type: [Number, String],
      default: 0
    },
    /** 最小刻度 */
    min: {
      type: Number,
      default: 0
    },
    /** 最大刻度 */
    max: {
      type: Number,
      default: 100
    },
    /** 间隔 */
    precision: {
      type: Number,
      default: 1
    },

    /** 刻度字体大小 */
    fontSize: {
      type: Number,
      default: 14
    },
    /** 刻度字体颜色 */
    fontColor: {
      type: String,
      default: '#FFF'
    },
    /** 刻度字体与上边界距离 */
    fontMarginTop: {
      type: Number,
      default: 35
    },
    /** 尺子宽度 */
    canvasWidth: {
      type: Number,
      default() {
        return document.body.clientWidth || 375
      }
    },
    /** 尺子高度 */
    canvasHeight: {
      type: Number,
      default: 83
    },
    /** 长刻度线高度 */
    heightDecimal: {
      type: Number,
      default: 35
    },
    /** 短刻度线高度 */
    heightDigit: {
      type: Number,
      default: 18
    },
    /** 刻度线宽度 */
    lineWidth: {
      type: Number,
      default: 2
    },
    /** 长刻度线颜色 */
    colorDecimal: {
      type: String,
      default: '#FFF'
    },
    /** 短刻度线颜色 */
    colorDigit: {
      type: String,
      default: '#FFF'
    },
    /** 两个刻度线之间的像素宽度 */
    divide: {
      type: Number,
      default: 10
    }
  },

  watch: {
    value() {
      if (this.$ruler.options.currentValue !== this.value) {
        this.$ruler.options.currentValue = this.value
        this.$ruler.dreawCanvas()
      }
    }
  },

  mounted() {
    this.$ruler = this._renderSlideRuler()
  },

  methods: {
    _renderSlideRuler() {
      return new Ruler({
        el: this.$el.querySelector('.ruler-canvas'),
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        heightDecimal: this.heightDecimal,
        colorDecimal: this.colorDecimal,
        heightDigit: this.heightDigit,
        colorDigit: this.colorDigit,
        divide: this.divide,
        fontSize: this.fontSize,
        fontColor: this.fontColor,
        fontMarginTop: this.fontMarginTop,
        lineWidth: this.lineWidth,
        maxValue: this.max,
        minValue: this.min,
        currentValue: this.value,
        handleValue: this.handleValue,
        precision: this.precision
      })
    },

    handleValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.ruler {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -15px;
    z-index: 1;

    transform: translateX(-50%);

    background-color: transparent;
    border: 5px solid transparent;
    border-top: 10px solid #fff;
  }
}
</style>