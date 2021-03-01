<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>申请医生</span>
            <span>：</span>
          </span>
          <el-input v-model="model.fromDoctorName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>申请机构</span>
            <span>：</span>
          </span>
          <el-input v-model="model.fromDoctorName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>会诊状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.consultStatus"
                     clearable
                     placeholder="全部">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in consultationStatus"></el-option>
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
                  stripe
                  pagination>
        <PeaceTableColumn label="患者姓名"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          min-width="60"
                          prop="familyAge"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          min-width="60"
                          prop="familySex"></PeaceTableColumn>
        <PeaceTableColumn label="初步判断"
                          min-width="220"
                          prop="familyDisagnose"></PeaceTableColumn>
        <PeaceTableColumn label="申请医生"
                          min-width="100"
                          prop="fromDoctorName"></PeaceTableColumn>
        <PeaceTableColumn label="申请机构"
                          min-width="148"
                          prop="fromHospitalName"></PeaceTableColumn>
        <PeaceTableColumn label="期望会诊时间"
                          min-width="165"
                          prop="expectTime"></PeaceTableColumn>
        <PeaceTableColumn label="申请时间"
                          min-width="165"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn label="会诊状态"
                          min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.consultStatus | getEnumLabel(source.ENUM_CONSULT_STATUS) }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          min-width="80">
          <template slot-scope="scope">
            <el-button @click="getConsultDetail(scope.row.consultNo)"
                       type="text"
                       v-if="scope.row.consultStatus === 3">审核</el-button>
            <el-button @click="getConsultDetail(scope.row.consultNo)"
                       type="text"
                       v-else>详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialogVisible"
                 append-to-body
                 title="会诊详情"
                 v-if="dialogVisible"
                 width="580px">
      <consult-invite-info :data="currentConsultation"
                           @close="close"
                           @update="getList"></consult-invite-info>
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import ConsultInviteInfo from './components/ConsultInviteInfo.js'

export default {
  name: 'ConsultationInvite',
  components: { ConsultInviteInfo },
  data() {
    return {
      source: {
        ENUM_CONSULT_STATUS: CONSTANT.ENUM_CONSULT_STATUS
      },
      model: {
        fromDoctorName: '',
        fromHospitalName: '',
        consultStatus: ''
      },

      currentConsultation: '',

      dialogVisible: false
    }
  },
  computed: {
    consultationStatus() {
      const list = this.source.ENUM_CONSULT_STATUS
      return list.filter((v) => {
        return v.value > 2
      })
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
      const fetch = Service.getConsultInviteList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    getConsultDetail(id) {
      Service.getConsultDetail({ consultNo: id }).then((res) => {
        this.currentConsultation = res.data.info
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