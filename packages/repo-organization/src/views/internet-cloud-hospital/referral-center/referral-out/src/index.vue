<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>转出医生</span>
            <span>：</span>
          </span>
          <el-input v-model="model.outDoctorName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>转入机构</span>
            <span>：</span>
          </span>
          <el-input v-model="model.inHospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>转诊状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.transferStatus"
                     clearable
                     placeholder="全部">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_REFERRAL_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="患者姓名"
                          prop="patient_name"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          min-width="60"
                          prop="age"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          min-width="60"
                          prop="sex"></PeaceTableColumn>
        <PeaceTableColumn label="初步判断"
                          min-width="220"
                          prop="diagnose"></PeaceTableColumn>
        <PeaceTableColumn label="转出医生"
                          min-width="100"
                          prop="doctor_name"></PeaceTableColumn>
        <PeaceTableColumn label="转入机构"
                          min-width="148"
                          prop="netHospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="期望转诊时间"
                          min-width="165"
                          prop="expect_time"></PeaceTableColumn>
        <PeaceTableColumn label="申请时间"
                          min-width="165"
                          prop="created_time"></PeaceTableColumn>
        <PeaceTableColumn label="转诊状态"
                          min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.transfer_status | getEnumLabel(source.ENUM_REFERRAL_STATUS) }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          min-width="80">
          <template slot-scope="scope">
            <el-button @click="getReferralDetail(scope.row.id, scope.row.referral_log_id)"
                       type="text"
                       v-if="scope.row.transfer_status === 1">审核</el-button>
            <el-button @click="getReferralDetail(scope.row.id, scope.row.referral_log_id)"
                       type="text"
                       v-else>详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialogVisible"
                 title="转诊详情"
                 v-if="dialogVisible"
                 width="580px"
                 append-to-body>
      <referral-out-info :id="currentId"
                         :info="currentReferral"
                         @close="closeDialog"
                         @update="getList"></referral-out-info>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import ReferralOutInfo from './components/ReferralOutInfo'

export default {
  name: 'ReferralOut',
  components: { ReferralOutInfo },
  data() {
    return {
      source: {
        ENUM_REFERRAL_STATUS: CONSTANT.ENUM_REFERRAL_STATUS
      },
      model: {
        outDoctorName: '',
        inHospitalName: '',
        transferStatus: ''
      },

      currentId: '',
      currentReferral: '',

      dialogVisible: false
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getReferralOutList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    getReferralDetail(id, referralId) {
      this.currentId = referralId

      Service.getReferralDetail({ referral_id: id }).then((res) => {
        this.currentReferral = res.data
        this.dialogVisible = true
      })
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.primary {
  color: var(--q-color-primary);
  cursor: pointer;
}
</style>