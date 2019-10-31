// eslint-disable

<template>
  <div class="container"
       ref="container">
    <div class="ruler_container"
         id="ruler_container">
      <div class="interval-hidden"
           v-for="n in half"
           :key="`half-begin${n}`"
           :style="{ width: 5 * interval + 'px' , visibility: 'hidden' }">
      </div>

      <div class="interval"
           v-for="n in count"
           :key="`count${n}`"
           :style="{ width: 10 * interval + 'px'}">
        <div class="scale"
             :class="{ noborder: i === interval + 1}"
             :style="{ width: '10px' }"
             :key="`interval${i}`"
             v-for="i in interval"></div>
        <span class="number">
          {{ min + interval * (n - 1) }}
        </span>
        <span class="after_number"
              v-if="n == count">{{ min + interval * n }}</span>
      </div>

      <div class="interval-hidden"
           v-for="n in half"
           :key="`half-over${n}`"
           :style="{ width: 10 * interval + 'px' , visibility: 'hidden' }">
      </div>
    </div>
    <div class="pointer"
         :style="{ backgroundColor:color }"></div>
  </div>
</template>
<script>
function throttle(method, context) {
  clearTimeout(method.tId)
  method.tId = setTimeout(function() {
    method.call(context)
  }, 300)
}
export default {
  name: 'peace-ruler',

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 150
    },
    interval: {
      type: Number,
      default: 10
    },
    color: {
      type: String,
      default: '#fff'
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    count() {
      return Math.ceil((this.max - this.min) / this.interval)
    }
  },

  methods: {
    getValue(v) {
      return Math.ceil((v - this.width_diff) / 10) + this.min
    },

    getApproximate(val) {
      let arr = this.values
      if (arr.indexOf(val) < 0) {
        arr.push(val)
        let index = arr
          .sort((a, b) => {
            return a - b
          })
          .indexOf(val)
        let a = arr[index - 1]
        let b = arr[index + 1]
        return Math.abs(val - a) > Math.abs(val - b) ? b : a
      } else {
        return val
      }
    }
  },

  data() {
    return {
      half: 0,
      mask_width: 0,
      width_diff: 0,
      ruler_container_width: 0,
      values: [],
      scrollLeft: 0,
      timer: 0
    }
  },

  mounted() {
    // 获取刻度尺的宽度
    let width = this.$refs.container.getBoundingClientRect().width
    // 刻度尺一半宽度需要多少个大区间，向上取整
    this.half = Math.ceil(width / 2 / (this.interval * 5))
    // 计算渐变蒙层的宽度
    this.mask_width = this.half * this.interval * 5
    // 计算渐变蒙层和实际一半宽度的差额，该值也用于调整计算min值的位置
    this.width_diff = Math.abs(width / 2 - this.mask_width)
    // 获取最大值时scrollLeft的值
    let max = this.count * this.interval * 10 + this.width_diff
    // 将所有值对应的scrollLeft值存在values中
    for (let i = this.min; i <= this.max; i++) {
      let v = this.width_diff + i * 5
      this.values.push(v)
    }
    // 获取刻度尺容器
    let dom = this.$el.querySelectorAll('.ruler_container')[0]
    // 设置初始化时刻度指向min值的位置
    let location = this.width_diff
    if (this.value > this.min && this.value < this.max) {
      location = this.width_diff + (this.value - this.min) * 5
    }
    this.scrollLeft = dom.scrollLeft = location
    // 添加滚动监听事件
    let _this = this
    dom.addEventListener('scroll', event => {
      let obj = event.srcElement ? event.srcElement : event.target
      if (obj.scrollLeft < _this.width_diff) {
        _this.scrollLeft = obj.scrollLeft = _this.width_diff
      } else if (obj.scrollLeft > max) {
        _this.scrollLeft = obj.scrollLeft = max
      }
      throttle(function() {
        _this.scrollLeft = dom.scrollLeft = _this.getApproximate(obj.scrollLeft)
      })
    })
  },
  watch: {
    scrollLeft() {
      let v = this.getValue(this.scrollLeft)
      this.$emit('input', v)
    },

    value(v) {
      const dom = this.$el.querySelectorAll('.ruler_container')[0]
      dom.scrollLeft = v * 10 + this.width_diff
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  margin: 0;

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  .ruler_container {
    white-space: nowrap;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    .interval {
      display: inline-block;
      height: 20px;
      box-sizing: border-box;
      margin-top: 10px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 1px;
        height: 20px;
        background: #fff;
      }
      &::after {
        content: '';
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        width: 1px;
        height: 20px;
        background: #fff;
      }

      .scale {
        margin-top: 5px;
        display: inline-block;
        box-sizing: border-box;
        width: 10px;
        white-space: nowrap;
        height: 15px;
        &:not(:first-child) {
          border-left: solid 1px #fff;
        }
        &.noborder {
          border: none;
        }
      }
      .after_number,
      .number {
        display: block;
        position: absolute;
        z-index: 4;
        top: 25px;
        color: #fff;
      }
      .number {
        transform: translateX(-50%);
        left: 0;
      }
      .after_number {
        transform: translateX(50%);
        right: 0;
      }
      .left_mask {
        position: absolute;
        top: 0;
        left: -1px;
        height: 100%;
        z-index: 3;
        background: -webkit-linear-gradient(left, rgb(255, 255, 255), rgba(255, 255, 255, 0.5));
      }
      .right_mask {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        z-index: 3;
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0.5), rgb(255, 255, 255));
      }
    }

    .interval-hidden {
      display: inline-block;
      height: 20px;
      box-sizing: border-box;
      margin-top: 10px;
      position: relative;
      visibility: hidden;
    }
  }
  .pointer {
    background: transparent !important;
    width: 2px;
    height: 30px;
    position: absolute;
    left: calc(50% - 5px);
    top: 0;

    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #fff;

    // transform: translateX(-50%);
    // z-index: 999;

    // background-color: transparent !important;
    // border-color: #fff #fff0 #fff0 #fff0;
    // border-style: solid;
    // border-width: 10px 10px 0 10px;
    // height: 0;
    // width: 0;
  }
}
</style>