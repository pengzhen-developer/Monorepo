/*
 * 体脂
*/

<template>
  <div @click="showReport" class="record-body-fat" v-if="data">
    <div class="left">
      <i class="icon icon_ic_bodyfat"></i>
      <span class="text">体脂率</span>
    </div>

    <template v-if="data">
      <div class="center">
        <p class="center-title">
          {{ data.bfr }}
          <span class="center-title-unit">%</span>
          <el-tag :type="getTagType(data.resultType)" class="center-title-tag">{{ getTagText(data.resultType) }}</el-tag>
        </p>
        <p class="center-text" v-if="this.type === '2'">{{ data.createdTime }}</p>
      </div>

      <div class="right" v-if="this.type === '2'">
        <el-button @click="showReport" type="text">查看详情</el-button>
      </div>
    </template>

    <template v-else>暂无数据</template>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    data: Object,
    type: String
  },

  methods: {
    getTagType(resultType) {
      switch (resultType) {
        case '0': // 暂无数据
          return ''
        case '1': // 偏高
          return 'danger'
        case '2': // 正常
          return ''
        case '3': // 偏低
          return 'warning'
        default:
          return 'info'
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
      const dataId = this.data.id
      const idCard = this.data.idCard
      const serviceId = peace.type.HEALTH.SERVICE_ID.无
      const type = peace.type.HEALTH.TYPE.体脂
      const path = `/patient/patientDetail/report/${dataId}/${idCard}/${serviceId}/${type}`

      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-body-fat {
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;

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
</style>

