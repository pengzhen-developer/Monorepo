// 金额小数的字体大小比整数的字体小4px

<template>
  <div class="peace-price"
       v-bind:class="{'line-through':lineThrough}">
    <span v-bind:style="`lineHeight:${size}px`">{{prefix}}{{originalPrice}}</span>
    <div class="price-result"
         v-bind:style="`transformOrigin:${transformOrigin};${transformOrigin}:0;`">
      <div v-bind:style="`fontSize:${unitSize}px`"
           style="white-space:nowrap;"
           class="mb1">{{prefix}}</div>
      <div v-bind:style="`fontSize:${integerSize}px`">{{originalPrice | getPriceInteger}}</div>
      <div v-bind:style="`fontSize:${decimalSize}px`"
           class="mb1">
        {{originalPrice | getPriceDecimal}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'peace-price',
  props: {
    transformOrigin: {
      type: String,
      default: () => {
        return 'left'
      }
    },
    price: {
      type: [String, Number],
      default: () => {
        return '0.00'
      }
    },
    /**
     * 默认size
     */
    size: {
      type: [String, Number],
      default: () => {
        return '14'
      }
    },
    /**
     * 金额单位size,可选
     */
    prefixSize: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    /**
     * 金额整数size,可选
     */
    intSize: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    /**
     * 金额小数size,可选
     */
    decSize: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },

    lineThrough: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    prefix: {
      type: String,
      default: () => {
        return '￥'
      }
    }
  },
  computed: {
    originalPrice() {
      return (this.price - 0).toFixed(2)
    },
    integerSize() {
      return 2 * (this.intSize || this.size)
    },
    decimalSize() {
      return 2 * (this.decSize || this.size - 4)
    },
    unitSize() {
      return 2 * (this.prefixSize || this.size - 2)
    }
  },

  filters: {
    getPriceInteger: (num) => {
      return num.toString().split('.')[0]
    },
    getPriceDecimal: (num) => {
      if (num.toString().split('.')[1]) {
        return '.' + num.toString().split('.')[1]
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.peace-price {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: 1 !important;

  &.line-through {
    text-decoration: line-through;

    > span {
      letter-spacing: 1px;
    }
  }
  //span 中的金额占位不显示

  span {
    color: transparent;
  }
  //转换后的金额
  .price-result {
    position: absolute;
    // right: 0;
    top: -50%;
    z-index: 6;
    transform: scale(0.5);
    // transform-origin: right;
    display: flex;
    align-items: flex-end;
    .mb1 {
      margin-bottom: 0.5px;
    }
  }
}
</style>