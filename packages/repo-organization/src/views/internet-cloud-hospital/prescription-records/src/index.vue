<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="82px"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>患者姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.patientname"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>医生姓名</span>
            <span>：</span>
          </span>
          <el-input v-model="model.doctorname"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>处方状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.prescriptionStatus"
                     clearable
                     placeholder="全部">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_PRESCRIPTION_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="110px">
          <span slot="label">
            <span>处方购药状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.orderDrugStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_PRESCRIPTION_DRUG_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>开具日期</span>
            <span>：</span>
          </span>
          <peace-date-picker type="daterange"
                             v-model="timeRange"
                             :picker-options="pickerOptions"
                             format="yyyy-MM-dd"
                             value-format="yyyy-MM-dd"></peace-date-picker>
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
                  stripe
                  pagination>
        <PeaceTableColumn label="处方编号"
                          prop="prescriptionNo"
                          width="200"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名">
          <template slot-scope="scope">
            <span @click="toPatientPage(scope.row.patient_family_id, scope.row.patient_name, scope.row.patient_no)"
                  class="primary">{{ scope.row.patient_name }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="patient_sex"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          prop="patient_age"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.idcard }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="开具医生"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="处方状态">
          <template slot-scope="scope">
            <span>{{ scope.row.prescription_status }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="处方购药状态"
                          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.orderDrug_status }}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="开具时间"
                          prop="created_time"
                          width="180"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button @click="getPrescriptionDetail(scope.row.prescribeId)"
                       type="text">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="prescriptionDialogVisible"
                 append-to-body
                 title="处方详情"
                 v-if="prescriptionDialogVisible"
                 width="580px">
      <prescription-info :id="currentPrescription"></prescription-info>
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import PrescriptionInfo from './components/PrescriptionInfo'

export default {
  name: 'PrescriptionList',
  components: { PrescriptionInfo },
  data() {
    return {
      model: {
        patientname: '',
        doctorname: '',
        prescriptionStatus: '',
        orderDrugStatus: '',
        startdate: '',
        enddate: ''
      },
      timeRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },

      currentPrescription: '',
      prescriptionDialogVisible: false,

      source: {
        ENUM_PRESCRIPTION_STATUS: CONSTANT.ENUM_PRESCRIPTION_STATUS,
        ENUM_PRESCRIPTION_DRUG_STATUS: CONSTANT.ENUM_PRESCRIPTION_DRUG_STATUS
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.startdate = timeRange[0] ? timeRange[0] : ''
        this.model.enddate = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.startdate = ''
        this.model.enddate = ''
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getPrescriptionList
      let params = Peace.util.deepClone(this.model)
      params.startdate = params.startdate ? params.startdate + ' 00:00:00' : ''
      params.enddate = params.enddate ? params.enddate + ' 23:59:59' : ''

      this.$refs.table.reloadData({ fetch, params })
    },
    getPrescriptionDetail(id) {
      this.currentPrescription = id
      this.prescriptionDialogVisible = true
    },

    toPatientPage(id, name, patientNo) {
      this.$router.push({
        path: '/internet-cloud-hospital/patient-management/patient-detail',
        query: { id, patientNo, name, type: 'inquiry' }
      })
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