<template>
  <div class="record-blood-pressure">
    <template v-if="type === '1'">
      <div @click="showReport"
           class="type-all">
        <div class="left">
          <i class="icon icon_ic_bloodpressure"></i>
          <span class="text">血压</span>
        </div>

        <template v-if="data">
          <div class="center">
            <p class="center-title">
              {{ data.systolicPressure }} / {{ data.diastolicPressure }}
              <span class="center-title-unit">mmHg</span>
              <el-tag :title="data.result"
                      :type="getTagType(data.resultType)"
                      class="center-title-tag">{{ data.result }}</el-tag>
            </p>
            <p class="center-text"
               v-if="this.type === '2'">{{ data.createdTime }}</p>
          </div>

          <div class="right"
               v-if="this.type === '2'">
            <el-button @click="showReport"
                       type="text">查看详情</el-button>
          </div>
        </template>

        <template v-else>暂无数据</template>
      </div>
    </template>

    <template v-if="type === '2'">
      <div class="type-daily">
        <div class="title">
          <span class="title-label">血压</span>
          <span class="title-value">{{ data.systolicPressure || '- -' }} /
            {{ data.diastolicPressure || '- -' }} mmHg</span>
          <el-tag :type="getTagType(data.resultType)"
                  class="title-result"
                  size="large"
                  v-if="!data.noData">{{ data.result }}</el-tag>
        </div>

        <hr class="divider" />

        <div class="content">
          <div class="row">
            <span class="content-label">脉率</span>
            <span class="content-divider">:</span>
            <span class="content-value">{{ data.pulseRate || '- -' }} 次/分</span>
          </div>
          <div class="row space-between">
            <span class="content-time">{{ data.createdTime }}</span>
            <el-button @click="showReport"
                       class="content-link"
                       type="text">历史数据>></el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Type from '@src/type'

export default {
  inject: ['provideGetTab', 'provideAddTab'],

  props: {
    data: {
      type: Object,
      default() {
        return {
          noData: true
        }
      }
    },
    type: String
  },

  methods: {
    getTagType(resultType) {
      switch (resultType) {
        case '2': // 正常
          return ''
        default:
          return 'warning'
      }
    },

    getTagText(resultType) {
      switch (resultType) {
        case '0': // 暂无数据
          return '暂无'
        case '1': // 偏高
          return '偏高'
        case '2': // 正常
          return '正常'
        case '3': // 偏低
          return '偏低'
        default:
          return '暂无'
      }
    },

    showReport() {
      if (this.data.noData) {
        return Peace.util.alert('暂无数据')
      }
      const dataId = this.type == 1 ? this.data.dataNo : this.data.id
      const idCard = this.data.idCard
      const serviceId = Type.HEALTH.SERVICE_ID.血压监测周报
      const type = Type.HEALTH.TYPE.血压
      const path = `/patient/patientDetail/report/${dataId}/${idCard}/${serviceId}/${type}`

      const currentMenu = this.provideGetTab('PatientDetailReport')
      currentMenu.menuName = '血压'
      currentMenu.menuRoute = path

      // 跳转当前路由
      this.provideAddTab(currentMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-blood-pressure {
  border-radius: 3px;

  .type-all {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 16px;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 25%;
      color: $--color-primary;

      .icon {
        font-size: 20px;
      }

      .text {
        font-size: 12px;
      }
    }

    .center {
      flex: 1;

      .center-title {
        font-size: 20px;
        color: rgba(56, 72, 92, 1);

        .center-title-unit {
          font-size: 12px;
          color: rgba(56, 72, 92, 1);
        }

        .center-title-tag {
          border-radius: 10px;
          margin: 0 0 0 10px;
          display: inline-block;
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }

      .center-text {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }

    .right {
      width: 80px;
    }
  }

  .type-daily {
    border: 1px solid rgba(245, 245, 245, 1);
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.01);
    padding: 16px;

    background: rgba(251, 251, 251, 1);
    background-image: url('~@src/assets/images/health-record/bg_blood pressure.png');
    background-repeat: no-repeat;
    background-position-x: 10px;
    background-position-y: 0;

    .title {
      position: relative;

      .title-label {
        font-size: 22px;
        font-weight: 600;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
        margin: 0 16px 0 0;
      }

      .title-value {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }

      .title-result {
        position: absolute;
        right: -25px;
        border-radius: 5px;
      }
    }

    .divider {
      margin: 20px 0;
    }

    .content {
      .row {
        margin: 0 0 5px 0;

        &:last-child {
          margin: 0;
        }

        &.space-between {
          display: flex;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .content-label {
        display: inline-block;
        width: 4em;
        text-align: justify;
        text-align-last: justify;

        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }

      .content-divider {
        margin: 0 5px;
      }

      .content-value {
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      .content-time {
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }

      .content-link {
      }
    }
  }
}
</style>