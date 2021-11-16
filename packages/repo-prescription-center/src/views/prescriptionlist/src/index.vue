<template>
  <div class="full-height overflow-auto">
    <div class="layout-route">

      <div class="card card-search q-mb-md">

        <el-form inline="inline"
                 label-suffix="："
                 label-width="auto"
                 size="mini"
                 v-bind:model="model"
                 v-on:submit.native.prevent
                 v-on:keyup.enter.native="fetch">

          <el-form-item label="处方编号">
            <PeaceInput v-model.trim="model.jztClaimNo"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="原始处方编号">
            <PeaceInput v-model.trim="model.prescriptionNo"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="存储产品线">
            <PeaceInput v-model.trim="model.bussinessChannel"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="开方渠道">
            <PeaceInput v-model.trim="model.channel"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="开方应用">
            <PeaceInput v-model.trim="model.application"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="开方机构">
            <PeaceInput v-model.trim="model.hosName"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="存储时间">
            <PeaceDatePicker v-model="updateTime"
                             end-placeholder="结束时间"
                             start-placeholder="开始时间"
                             type="daterange"
                             value-format="yyyy-MM-dd"></PeaceDatePicker>
          </el-form-item>

          <el-form-item>
            <el-button v-on:click="reset">重置</el-button>
            <el-button type="primary"
                       v-bind:loading="loading"
                       v-on:click="fetch">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">

        <PeaceTable ref="table"
                    pagination
                    style="width: 100%">

          <PeaceTableColumn label="处方编号"
                            min-width="140">
            <template slot-scope="scope">
              <div class="flex align-items-centerr">
                <span style="height: 20px">{{scope.row.jztClaimNo}}</span>
                <el-image class="q-ml-sm"
                          style="width: 20px; height: 20px"
                          :src="require('@src/assets/img/icon_pdf.png')"
                          v-if="scope.row.prescriptionImageUrl"></el-image>
              </div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="原始处方编号"
                            min-width="100"
                            prop="prescriptionNo"></PeaceTableColumn>
          <PeaceTableColumn label="存储产品线"
                            prop="bussinessChannel"
                            width="120"></PeaceTableColumn>
          <PeaceTableColumn label="开方渠道"
                            min-width="100"
                            prop="channel"></PeaceTableColumn>
          <PeaceTableColumn label="开方应用"
                            min-width="100"
                            prop="application"></PeaceTableColumn>
          <PeaceTableColumn label="开方机构"
                            min-width="160"
                            prop="hosName"></PeaceTableColumn>
          <PeaceTableColumn label="存储时间"
                            min-width="180"
                            prop="updateTime"></PeaceTableColumn>

          <PeaceTableColumn label="操作"
                            min-width="100">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="showDetail(scope.row)">查看详情
              </el-button>
            </template>
          </PeaceTableColumn>

        </PeaceTable>

      </div>

    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'orgList',

  data() {
    return {
      updateTime: [],
      model: {
        jztClaimNo: undefined,
        prescriptionNo: undefined,
        bussinessChannel: undefined,
        channel: undefined,
        application: undefined,
        hosName: undefined,
        startTime: undefined,
        endTime: undefined
      },
      loading: false,
      orgDetailOptions: {
        show: false,
        orgCode: undefined
      }
    }
  },

  watch: {
    updateTime(val) {
      this.model.startTime = val?.[0] ?? undefined
      this.model.endTime = val?.[1] ?? undefined
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getPrescriptionList
      this.loading = true
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    reset() {
      const resetParams = {
        jztClaimNo: undefined,
        prescriptionNo: undefined,
        bussinessChannel: undefined,
        channel: undefined,
        application: undefined,
        hosName: undefined,
        startTime: undefined,
        endTime: undefined
      }
      this.model = Object.assign(resetParams)
      this.updateTime = []
    },
    showDetail(row) {
      this.orgDetailOptions.orgCode = row.institutionCode
      this.orgDetailOptions.show = true
    },
    close() {
      this.orgDetailOptions = {
        show: false,
        orgCode: undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
//  background-color: #1890ff !important;
//}
</style>
