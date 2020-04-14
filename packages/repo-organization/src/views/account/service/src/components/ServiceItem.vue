<template>
  <div class="service-item">
    <div class="header">
      <div class="header-title">
        <span>{{ title }}</span>
      </div>
      <div class="header-state">
        <el-tag size="mini"
                v-bind:type="stateType">{{ state }}</el-tag>
      </div>
      <div class="header-control"
           v-if="controlState"
           v-bind:class="controlStateType"
           v-on:click="openSerivce">
        <div class="dash"></div>
        <div class="text">{{ controlState }}</div>
      </div>
    </div>
    <div class="content">
      <!-- flex  平均分布， 且支持换行 -->
      <div class="feature-item"
           v-for="(feature, index) in dispalyFeatures"
           v-bind:key="feature + index"
           v-show="feature !== 'dispaly-none'">
        <div class="dash"></div>
        <div class="text">{{ feature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    controlState: {
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
    },

    stateType() {
      if (this.state === '未开通') {
        return 'info'
      } else if (this.state === '已开通') {
        return 'primary'
      }

      return 'info'
    },

    controlStateType() {
      if (this.controlState === '待审核') {
        return 'danger'
      } else if (this.controlState === '申请开通') {
        return 'warning'
      }

      return ''
    }
  },

  methods: {
    openSerivce() {
      this.$confirm('申请开通后，需等待平台审核，确认开通？', '确认开通', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          console.log(true)
        })
        .catch(() => {
          console.log(false)
        })
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

    .header-state {
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