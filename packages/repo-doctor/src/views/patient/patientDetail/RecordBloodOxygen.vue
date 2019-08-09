/*
 * 血氧
*/

<template>
  <div @click="showReport" class="record-blood-oxygen">
    <div class="left">
      <i class="icon icon_ic_bloodoxygen"></i>
      <span class="text">血氧</span>
    </div>

    <template v-if="data">
      <div class="center">
        <p class="center-title">
          {{ data.bloodOxygen }}
          <span class="center-title-unit">%</span>
          <el-tag :title="data.result" :type="getTagType(data.resultType)" class="center-title-tag">{{ data.result }}</el-tag>
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
        case '1': // 偏低
          return '偏低'
        case '2': // 正常
          return '正常'
        case '3': // 供养不足
          return '供养不足'
        default:
          return '暂无'
      }
    },

    showReport() {
      const dataId = this.data.id
      const idCard = this.data.idCard
      const serviceId = peace.type.HEALTH.SERVICE_ID.无
      const type = peace.type.HEALTH.TYPE.血氧
      const path = `/patient/patientDetail/report/${dataId}/${idCard}/${serviceId}/${type}`

      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-blood-oxygen {
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
        display: inline-block;
        max-width: 70px;
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
</style>

