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

          <el-form-item label="内部来源">
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
              <div class="flex align-items-center "
                   style="flex-wrap: nowrap">

                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.jztClaimNo"
                            placement="top">
                  <div class="ellipsis"
                       style="height: 20px">{{scope.row.jztClaimNo}}</div>
                </el-tooltip>

                <img class="q-ml-sm"
                     style="width: 20px; height: 20px"
                     :src="require('@src/assets/img/icon_pdf.png')"
                     v-if="scope.row.prescriptionImageUrl" />
              </div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="原始处方编号"
                            min-width="180"
                            prop="prescriptionNo"></PeaceTableColumn>
          <PeaceTableColumn label="内部来源"
                            prop="bussinessChannel"
                            width="120"></PeaceTableColumn>
          <PeaceTableColumn label="开方渠道"
                            min-width="100"
                            prop="channel"></PeaceTableColumn>
          <PeaceTableColumn label="开方应用"
                            min-width="100"
                            prop="application"></PeaceTableColumn>
          <PeaceTableColumn label="开方机构"
                            min-width="180"
                            prop="hosName"></PeaceTableColumn>
          <PeaceTableColumn label="存储时间"
                            min-width="180"
                            prop="createTime"></PeaceTableColumn>
          <PeaceTableColumn label="审核状态"
                            min-width="100"
                            prop="pharmacistCheckResult">
            <template slot-scope="scope">
              {{ scope.row.pharmacistCheckResult | filterDictionaryFuzzy(source.pharmacist_check_result) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="购药有效状态"
                            min-width="120"
                            prop="validState">
            <template slot-scope="scope">
              {{ scope.row.validState | filterDictionaryFuzzy(source.valid_state) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="订单状态"
                            min-width="100"
                            prop="orderState">
            <template slot-scope="scope">
              {{ scope.row.orderState | filterDictionaryFuzzy(source.order_state) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="缴费状态"
                            min-width="100"
                            prop="paymentStatus">
            <template slot-scope="scope">
              {{ scope.row.paymentStatus | filterDictionaryFuzzy(source.payment_status) }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            fixed="right"
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

    <peace-dialog append-to-body
                  title="处方详情"
                  width="580px"
                  v-if="dialog.visible"
                  v-bind:visible.sync="dialog.visible">
      <prescription-detail v-bind:data="dialog.data"></prescription-detail>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'
import PrescriptionDetail from './components/PrescriptionDetail'

export default {
  name: 'orgList',

  components: {
    PrescriptionDetail
  },

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
      source: {
        payment_status: [],
        order_state: [],
        valid_state: [],
        pharmacist_check_result: []
      },
      loading: false,
      dialog: {
        visible: false,
        jztClaimNo: undefined,
        data: undefined
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
    this.$nextTick().then(async () => {
      this.source.payment_status = await Peace.identity.dictionary.getList('payment_status')
      this.source.order_state = await Peace.identity.dictionary.getList('order_state')
      this.source.valid_state = await Peace.identity.dictionary.getList('valid_state')
      this.source.pharmacist_check_result = await Peace.identity.dictionary.getList('pharmacist_check_result')

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
      this.dialog.jztClaimNo = row.jztClaimNo
      this.dialog.visible = true
      const tmp = this.fetchDetail.bind(this)
      this.dialog.data = tmp
    },

    async fetchDetail() {
      const params = { jztClaimNo: this.dialog.jztClaimNo }
      const res = await Service.getPrescription(params)
      return res?.data
    },

    close() {
      this.dialog = {
        visible: false,
        jztClaimNo: undefined,
        data: undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
