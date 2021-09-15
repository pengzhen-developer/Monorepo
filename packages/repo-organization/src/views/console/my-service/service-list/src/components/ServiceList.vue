<template>
  <div>
    <div class="card">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
             v-for="item in list"
             v-bind:key="item.id">
          <div class="column q-pa-md service-card">
            <!-- 服务名称 -->
            <p class="text-grey-333 text-weight-bold text-subtitle1">{{ item.serviceName }}</p>

            <div class="col column q-pa-md bg-white">
              <!-- 使用状态 -->
              <div class="row justify-between items-center q-mb-sm">
                <div class="items-center">
                  <span v-bind:style="{ color: serviceStatusTitleColor(item.isOpen), 'line-height': '26px'}">使用状态：</span>
                  <span v-bind:style="{ color: serviceStatusTextColor(item.isOpen) }"
                        class="q-mr-md">{{ serviceStatusText(item.isOpen) }}</span>
                </div>
              </div>

              <!-- 对接方式 -->
              <div v-if="serviceAccessModeArr(item.accessModeArr).length > 0"
                   class="row no-wrap items-start q-mb-sm">
                <span>对接方式：</span>
                <div class="row">
                  <el-checkbox v-for="access in serviceAccessModeArr(item.accessModeArr)"
                               v-model="access.checked"
                               v-bind:true-label="1"
                               v-bind:false-label="0"
                               v-bind:key="access.id">{{ access.name }}</el-checkbox>
                </div>
              </div>

              <!-- 服务内容 -->
              <div v-if="serviceAccessModeArr(item.serviceContentArr).length > 0"
                   class="row no-wrap items-start q-mb-xs">
                <span class="level-title-style">服务内容：</span>
                <div class="row">
                  <el-checkbox v-for="service in serviceAccessModeArr(item.serviceContentArr)"
                               size="mini"
                               class="q-mb-sm"
                               v-model="service.checked"
                               v-bind:true-label="1"
                               v-bind:false-label="0"
                               v-bind:key="service.id">{{ service.name }}</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      Service.getMyServiceCard().then((res) => {
        this.list = res.data.list
      })
    },

    serviceStatusTitleColor(code) {
      return code == 1 ? '#999' : '#333'
    },

    serviceStatusTextColor(code) {
      return code == 1 ? '#999999' : '#3099A6'
    },

    serviceStatusText(code) {
      return code == 1 ? '已禁用' : '已启用'
    },

    serviceAccessModeArr(list) {
      const tmp = list.filter(function (item) {
        return item.checked === 1
      })
      return tmp
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .service-card {
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 10px;

  span {
    font-size: 14px;
  }

  .el-checkbox {
    pointer-events: none;
  }

  .el-checkbox__label {
    font-size: 14px;
    font-weight: 400;
    color: var(----q-color-grey-333) !important;
    opacity: 1;
  }

  .service-detail-button {
    text-align: left;
    font-size: 16px !important;
    margin-top: 4px;
    padding-left: 4px !important;
  }
}
</style>