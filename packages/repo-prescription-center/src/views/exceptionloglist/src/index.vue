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

          <el-form-item label="调用渠道">
            <PeaceInput v-model.trim="model.channel"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="异常类型">

            <PeaceSelect v-model="model.errorType"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.errorTypeList"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item label="更新时间">
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

          <PeaceTableColumn label="时间"
                            width="166"
                            prop="updateTime" />

          <PeaceTableColumn label="处方编号"
                            min-width="140">
            <template slot-scope="scope">
              <div class="flex align-items-center"
                   style="flex-wrap: nowrap">

                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.jztClaimNo"
                            placement="top">
                  <span style="height: 20px">{{scope.row.jztClaimNo}}</span>
                </el-tooltip>

                <img class="q-ml-sm"
                     style="width: 20px; height: 20px"
                     :src="require('@src/assets/img/icon_pdf.png')"
                     v-if="Number(scope.row.isPrescriptionImage ?? 0) === 1" />
              </div>
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="原始处方编号"
                            prop="prescriptionNo"
                            min-width="140">
          </PeaceTableColumn>

          <PeaceTableColumn label="调用渠道"
                            min-width="100"
                            prop="channel"></PeaceTableColumn>

          <PeaceTableColumn label="异常类型"
                            min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.errorType | filterDictionary(source.errorTypeList,'--')  }}</span>
            </template>

          </PeaceTableColumn>

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

    <peace-dialog title="查看详情"
                  width="480px"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialogOptions.show"
                  v-if="dialogOptions.show"
                  append-to-body>
      <exception-log-detail v-bind:id="dialogOptions.id"></exception-log-detail>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'
import ExceptionLogDetail from './components/ExceptionLogDetail.vue'
export default {
  name: 'exceptionLogList',
  components: {
    ExceptionLogDetail
  },
  data() {
    return {
      updateTime: [],
      model: {
        jztClaimNo: undefined,
        prescriptionNo: undefined,
        channel: undefined,
        errorType: undefined,
        startTime: undefined,
        endTime: undefined
      },
      source: {
        errorTypeList: []
      },
      loading: false,
      dialogOptions: {
        show: false,
        id: undefined
      }
    }
  },
  async mounted() {
    this.source.errorTypeList = await Peace.identity.dictionary.getList('prescription_operation_log')

    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  filters: {
    checkStatus: function(value) {
      return { success: '已通过', fail: '未通过', report: '待审核' }[value]
    }
  },

  watch: {
    updateTime(val) {
      this.model.startTime = val?.[0] ?? undefined
      this.model.endTime = val?.[1] ?? undefined
    }
  },

  methods: {
    fetch() {
      const params = Object.assign(this.model)
      const fetch = Service.getLogList
      this.loading = true
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    reset() {
      const resetParams = {
        jztClaimNo: undefined,
        prescriptionNo: undefined,
        channel: undefined,
        errorType: undefined,
        startTime: undefined,
        endTime: undefined
      }
      this.model = Object.assign(resetParams)
      this.updateTime = []
    },
    showDetail(row) {
      this.dialogOptions.id = `${row.id}`
      this.dialogOptions.show = true
    },
    close() {
      this.orgDetailOptions = {
        show: false,
        id: undefined
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
