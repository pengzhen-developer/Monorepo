<template>
  <div class="drugs">
    <template v-for="(drug,index) in info.drugJson">
      <div class="drug-item"
           v-if="showMoreInfo(index)"
           v-bind:key="index">
        <van-image :src="drug.DrugImage"
                   class="error--image drug-logo">
          <template v-slot:error>
            <img :src="require('@src/assets/images/icons/ic_none_drug.png')" />
          </template>
        </van-image>
        <div class="drug-content">
          <div class="drug-content-top">
            <div class="drug-content-top-left">
              <div class="drug-name">{{drug.DrugName}}</div>
            </div>
            <div class="drug-content-top-right"
                 @click="goInterDrugPage(drug)"
                 v-if="showInstructions">
              <span class="text-333-60">说明书</span>
              <van-image :src="require('@src/assets/images/ic_wenhao.png')"
                         class="intro-logo"></van-image>
            </div>
          </div>
          <div class="drug-content-bottom">
            <div class="drug-content-bottom-left text-333-60">规格：{{drug.DrugSpecification}}</div>
            <div class="drug-content-bottom-right">
              <span>￥{{drug.DrugUnitPrice | getPriceInteger}}</span>
              <span class="fs10px"
                    v-if="hasPriceDecimal(drug.DrugUnitPrice)">
                {{drug.DrugUnitPrice | getPriceDecimal}}
              </span>
              <span class="text-333-60">X{{drug.DrugQty}}</span>
            </div>
          </div>
        </div>
        <div class="drug-shadow"
             v-if="showShadow(index)"></div>
      </div>
    </template>

    <!-- 实付金额 -->
    <div class="moeny"
         v-if="canShowMoney">
      <div>实付金额</div>
      <div>￥{{totalMoney.toFixed(2)}}</div>
    </div>

    <!-- 收起/展开 -->
    <div class="operateModel"
         :class="{'show':isOpen}"
         v-on:click="changeIsOpen"
         v-if="canShowOperateModel">
      <div>{{!isOpen?'点击展开':'收起'}}</div>
      <van-image :src="!isOpen?require('@src/assets/images/ic_arrow_down.png'):require('@src/assets/images/ic_arrow_up.png')"></van-image>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'drugs',
  props: {
    //实付金额
    totalMoney: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    //药品信息
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //是否可查看更多
    showMore: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    //是否展示说明书
    showInstructions: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    //是否可操作
    onlyWatch: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      isOpen: false,
      canShowOperateModel: false
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
  },
  computed: {
    canShowMoney() {
      if (!this.showMore) {
        return true
      }
      if (this.info.drugJson.length < 2) {
        return true
      } else {
        if (this.isOpen) {
          return true
        } else {
          return false
        }
      }
    }
  },
  watch: {
    showMore: {
      handler(val) {
        if (val == false) {
          this.canShowOperateModel = val
        } else if (val == true) {
          this.canShowOperateModel = this.info.drugJson.length > 2 ? true : false
        }
      },
      immediate: true
    }
  },
  created() {
    this.isOpen = this.info.drugJson.length > 2 ? false : true
  },
  methods: {
    showShadow(index) {
      return this.canShowOperateModel && index == this.info?.drugJson?.length - 1
    },
    showMoreInfo(index) {
      if (!this.showMore) {
        return true
      }
      if (this.info.drugJson.length < 2) {
        return true
      } else {
        if (this.isOpen) {
          return true
        } else {
          if (index < 2) {
            return true
          } else {
            return false
          }
        }
      }
    },
    changeIsOpen() {
      this.isOpen = !this.isOpen
    },
    hasPriceDecimal(num) {
      if (num.toString().split('.')[1]) {
        return true
      } else {
        return false
      }
    },
    goInterDrugPage(item) {
      if (!this.onlyWatch) {
        return
      }
      const params = peace.util.encode({ name: item.DrugName })
      this.$router.push(`/inter/drugInterList/${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.drugs {
  padding: 0 16px;
  .drug-item {
    display: flex;
    padding: 16px 0;
    position: relative;
    border-bottom: 1px solid rgba(51, 51, 51, 0.05);
    > .van-image {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      margin-right: 8px;
    }
    .drug-content {
      flex: 1;
      .drug-content-top,
      .drug-content-bottom {
        display: flex;
        justify-content: space-between;
      }
      .drug-content-top-left,
      .drug-content-bottom-left {
        width: 70%;
      }
      .drug-content-top-right,
      .drug-content-bottom-right {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .drug-content-top-right {
        span {
          line-height: 1;
        }
      }
      .drug-content-bottom-right {
        &:last-child {
          margin-left: 5px;
        }
      }
    }
    .drug-shadow {
      position: absolute;
      z-index: 6;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    }
  }
  > .moeny {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
  }
  .operateModel {
    color: $primary;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 36px 0 12px 0;
    > div {
      line-height: 16px;
    }
    &.show {
      padding: 13px 0 10px 0;
    }
    .van-image {
      margin-left: 4px;
      width: 16px;
      height: 16px;
    }
  }
}
.intro-logo {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
.text-333-60 {
  color: rgba(51, 51, 51, 0.6);
}
.fs10px {
  font-size: 20px;
  transform: scale(0.5);
  line-height: 1;
  margin-right: -10px;
  transform-origin: left;
}
</style>