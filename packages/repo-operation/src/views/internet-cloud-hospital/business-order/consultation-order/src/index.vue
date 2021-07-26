<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               label-suffix="："
               label-width="auto"
               inline>
        <el-form-item label="申请医生">
          <el-input placeholder="输入申请医生"
                    v-model="search.fromDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="邀请医生">
          <el-input placeholder="输入邀请医生"
                    v-model="search.toDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="就诊人">
          <el-input placeholder="输入就诊人姓名"
                    v-model="search.familyName"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="search.orderStatus">
            <el-option label="全部"
                       value></el-option>
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.consultationStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="会诊编号"
                          min-width="160">
          <template slot-scope="scope">
            <el-button @click="getOrderInfo(scope.row.consultNo)"
                       size="mini"
                       type="text">{{ scope.row.consultNo }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="订单渠道"
                          min-width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.orderChannel }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="就诊人"
                          min-width="120"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn label="邀请方"
                          min-width="150">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.fromHospitalName }}</span>
              <br />
              <span class="mr-xs">{{ scope.row.fromDeptName }}</span>
              <span>{{ scope.row.fromDoctorName }}</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="受邀方"
                          min-width="150">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.toHospitalName }}</span>
              <br />
              <span class="mr-xs">{{ scope.row.toDeptName }}</span>
              <span>{{ scope.row.toDoctorName }}</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="会诊时间"
                          min-width="180"
                          prop="consultTime"></PeaceTableColumn>
        <PeaceTableColumn label="订单状态"
                          min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.consultStatus | getEnumLabel(source.consultationStatus) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          width="100"
                          label="操作">
          <template slot-scope="scope">
            <el-button @click="getOrderInfo(scope.row.consultNo)"
                       type="text">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

    </div>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialogVisible"
                  title="会诊订单详情"
                  v-if="dialogVisible"
                  append-to-body
                  width="580px">
      <consultation-order-info :data="currentConsultationInfo"></consultation-order-info>
    </peace-dialog>
  </div>
</template>
<script>
import Service from './service'
import Constant from './constant'
import ConsultationOrderInfo from './components/ConsultationOrderInfo'

export default {
  name: 'consultation-order',
  components: {
    ConsultationOrderInfo
  },
  data() {
    return {
      search: {
        fromDoctorName: '',
        toDoctorName: '',
        familyName: '',
        orderStatus: '',
        p: 1,
        size: 10
      },
      source: {
        consultationStatus: Constant.CONSULTATION_STATUS
      },
      currentConsultationInfo: '',
      dialogVisible: false
    }
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  methods: {
    fetch() {
      const fetch = Service.getList
      const params = this.search

      this.$refs.table.reloadData({ fetch, params })
    },

    // 订单信息
    getOrderInfo(id) {
      const params = { consultNo: id }
      Service.getInfo(params).then((res) => {
        this.currentConsultationInfo = res.data.info
        this.dialogVisible = true
      })
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
