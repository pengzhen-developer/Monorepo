<template>
  <div class="layout-route flex"
       v-loading="loading">
    <div v-if="detail.accessId"
         class="q-pa-lg full-width bg-white">
      <div class="info-item flex justify-start items-center">
        <div class="info-label">Accesskey ID：</div>
        <div class="info-value">{{detail.accessId}}</div>
      </div>
      <div class="info-item flex justify-start items-center">
        <div class="info-label">AccessKey Secret ：</div>
        <div class="info-value flex justify-start items-center">
          <span v-if="isHide">
            ******
          </span>
          <span v-else>
            {{ detail.accessSecret }}
          </span>
          <i class="icon el-icon-view eyes"
             @click="showAndHid()"></i>
        </div>
      </div>
      <div class="info-item flex justify-start items-center">
        <div class="info-label">创建时间：</div>
        <div class="info-value">{{detail.createTime}}</div>
      </div>
    </div>
    <div v-else
         class="q-pa-lg full-width bg-white flex justify-center items-start">
      <div class="q-pa-lg text-subtitle1">暂无数据</div>
    </div>
  </div>

</template>

<script>
import Service from './service'

export default {
  name: 'ServiceCertificate',

  data() {
    return {
      loading: false,
      detail: {},
      isHide: true
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getCertification()
    })
  },

  methods: {
    getCertification() {
      this.loading = true
      Service.getCertification()
        .then((res) => {
          this.detail = res.data || {}
        })
        .finally(() => {
          this.loading = false
        })
    },

    showAndHid() {
      this.isHide = !this.isHide
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  &-item {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 24px;
    margin-bottom: 20px;
  }
  &-label {
    opacity: 0.85;
  }
  &-value {
    opacity: 0.65;
    margin-left: 8px;
  }
}
.eyes {
  margin-left: 12px;
  font-size: 18px;
  cursor: pointer;
}
</style>