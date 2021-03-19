// 金额小数的字体大小比整数的字体小4px

<template>
  <div class="peace-price">
    <span v-bind:style="`lineHeight:${size}px`">{{prefix}}{{originalPrice}}</span>
    <div class="price-result"
         v-bind:class="{'line-through':lineThrough}">
      <div v-bind:style="`fontSize:${unitSize}px`">{{prefix}}</div>
      <div v-bind:style="`fontSize:${integerSize}px`">{{originalPrice | getPriceInteger}}</div>
      <div v-bind:style="`fontSize:${decimalSize}px`">
        {{originalPrice | getPriceDecimal}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'peace-price',
  props: {
    price: {
      type: [String, Number],
      default: () => {
        return '0.00'
      }
    },
    size: {
      type: [String, Number],
      default: () => {
        return '14'
      }
    },
    // prefixSize:{
    //   type:Boolean,
    //   default: () => {
    //     return false
    //   }
    // },
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
      return 2 * this.size
    },
    decimalSize() {
      return 2 * (this.size - 4)
    },
    unitSize() {
      return 2 * (this.size - 2)
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

  // 小数点缩放后展示回有空白
  margin-right: -3px;
  //span 中的金额占位不显示
  span {
    color: transparent;
  }
  //转换后的金额
  .price-result {
    position: absolute;
    left: 0;
    top: -50%;
    z-index: 6;
    transform: scale(0.5);
    transform-origin: left;
    display: flex;
    align-items: flex-end;
    &.line-through {
      text-decoration: line-through;
    }
  }
}
</style>