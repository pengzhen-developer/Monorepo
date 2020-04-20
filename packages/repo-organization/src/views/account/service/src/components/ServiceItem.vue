<template>
  <div class="service-item">
    <div class="header">
      <div class="header-title">
        <span>{{ serviceName }}</span>
      </div>
      <div class="header-isPass">
        <el-tag size="mini"
                v-bind:type="isPassType">{{ isPassTextVisible }}</el-tag>
      </div>
      <div class="header-control"
           v-if="showCheckStatusText"
           v-bind:class="checkStatusType"
           v-on:click="openService">
        <div class="dash"></div>
        <div class="text">{{ checkStatusTextVisible }}</div>
      </div>
    </div>
    <div class="content">
      <!-- flex  平均分布， 且支持换行 -->
      <div class="feature-item"
           v-for="(feature, index) in dispalyFeatures"
           v-bind:key="feature + index"
           v-show="feature !== 'dispaly-none'">
        <div class="dash"></div>
        <div class="text">{{ feature.serviceName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serviceName: {
      type: String,
      required: true
    },
    isPass: {
      type: Number,
      required: true
    },
    isPassText: {
      type: String,
      required: true
    },
    checkStatus: {
      type: Number,
      required: true
    },
    checkStatusText: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },

  computed: {
    checkStatusTextVisible() {
      if (this.checkStatusText === '未申请') {
        return '申请开通'
      }

      return this.checkStatusText
    },

    checkStatusType() {
      if (this.checkStatusText === '待审核') {
        return 'danger'
      } else if (this.checkStatusText === '未申请') {
        return 'warning'
      } else if (this.checkStatusText === '未通过') {
        return 'danger'
      }
      return ''
    },

    showCheckStatusText() {
      if (this.checkStatusText === '已通过') {
        return false
      }

      return true
    },

    isPassType() {
      if (this.isPassText === '未申请') {
        return 'info'
      } else if (this.isPassText === '已通过') {
        return 'primary'
      }

      return 'info'
    },

    isPassTextVisible() {
      if (this.isPassText === '已通过') {
        return '已开通'
      }

      return this.isPassText
    },

    // flex  平均分布， 且支持换行
    dispalyFeatures() {
      // 定义每行最大 item
      const lineMaxCount = 2
      // 求剩余空白行
      const remainingCount =
        this.features.length % lineMaxCount === 0 ? 0 : lineMaxCount - (this.features.length % lineMaxCount)
      // 求剩余空白行数组，并添加特殊标识
      const remainingArray = new Array(remainingCount).fill('dispaly-none')
      // 合并空白行数组
      const dispalyFeatures = this.features.concat(remainingArray)

      return dispalyFeatures
    }
  },

  methods: {
    openService() {
      this.$emit('openService')
    }
  }
}
</script>

<style lang="scss" scoped>
.service-item {
  background: #fff;
  padding: 24px 24px 12px 24px;
  margin: 0 0 16px 0;
  border-radius: 4px;
  min-height: 138px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;

    margin: 0 0 16px 0;

    .header-title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);

      margin: 0 16px 0 0;
    }

    .header-isPass {
      display: flex;
      align-items: center;
      margin: 0 8px 0 0;

      .el-tag {
        border-radius: 12px;
      }
    }

    .header-control {
      display: flex;
      align-items: center;

      &.warning {
        .dash {
          background: $--color-warning;
        }
        .text {
          color: $--color-warning;
        }
      }

      &.danger {
        .dash {
          background: $--color-danger;
        }
        .text {
          color: $--color-danger;
        }
      }

      .dash {
        background: #d9d9d9;
        width: 8px;
        height: 8px;
        border-radius: 50%;

        margin: 0 5px 0 0;
      }

      .text {
        font-size: 12px;
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .feature-item {
      display: flex;
      align-items: center;
      width: 50%;
      margin: 0 0 12px 0;

      .dash {
        background: #d9d9d9;
        width: 5px;
        height: 5px;
        border-radius: 50%;

        margin: 0 10px 0 0;
      }

      .text {
        font-size: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
.service-item-confirm {
  padding-bottom: 0;
  width: auto;

  .el-message-box__title {
    font-size: 16px;
  }

  .el-message-box__content {
    padding: 10px 40px 40px 40px;
  }

  .el-message-box__btns {
    display: flex;
    padding: 0;

    font-size: 14px;
  }

  .service-item-confirm-cancel {
    width: 50%;
    margin: 0 !important;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    border-radius: 0;
    padding: 16px 0;

    &:active {
      border-color: #dcdfe6;
    }
  }

  .service-item-confirm-confirm {
    width: 50%;
    margin: 0 !important;
    background: #fff;
    color: $--color-primary;
    border-color: #dcdfe6;
    border-radius: 0;
    border-right: 0;
    border-bottom: 0;
    padding: 16px 0;

    &:hover {
      background: $--color-primary-light-9;
    }
  }
}
</style>