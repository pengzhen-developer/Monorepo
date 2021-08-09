<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="getList"
               v-on:submit.native.prevent>

        <el-form-item label="姓名">
          <el-input v-model.trim="model.name"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="model.tel"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-select v-model="model.useStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ACCOUNT_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在医院">
          <el-input v-model.trim="model.hospital"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="互联网医院">
          <el-input v-model.trim="model.nethospital"
                    maxlength="50"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="二级科室">
          <el-select v-model="model.depNameId"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option :key="item.id"
                       :label="item.netdept_name"
                       :value="item.id"
                       v-for="item in secondDeptList"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请入驻时间">
          <peace-date-picker type="daterange"
                             v-model="timeRange"
                             value-format="yyyy-MM-dd"></peace-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button @click="openDoctorsImportDialog"
                   type="primary">批量导入</el-button>
        <el-button @click="download">模板下载</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="姓名"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="手机号"
                          min-width="120"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn label="所在医院"
                          min-width="150"
                          prop="hospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="互联网医院"
                          min-width="150"
                          prop="netHospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="申请入驻时间"
                          min-width="180"
                          prop="created_time">
          <template slot-scope="scope">
            <div v-if="scope.row.source==2">{{ scope.row.entryTime  }}</div>
            <div v-else>{{ scope.row.created_time }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="认证时间"
                          min-width="180"
                          prop="created_time">
          <template slot-scope="scope">
            <div>{{ scope.row.created_time || '——' }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="二级科室"
                          min-width="100"
                          prop="created_time">
          <template slot-scope="scope">
            <div>{{ scope.row.netdept_child || '——' }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="医生来源"
                          min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.source | getEnumLabel(source.ENUM_DOCTOR_SOURCE) }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.is_pass | getEnumLabel(source.ENUM_PASS_STATUS) }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          min-width="100">
          <template slot-scope="scope">
            <el-switch @change="changeStatus(scope.row)"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#3099a6"
                       v-if="!((scope.row.is_pass == 'wait' && scope.row.source == 2) || (scope.row.is_pass == 'off' && scope.row.source == 2))"
                       v-model="scope.row.status"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          header-align="left"
                          align="left"
                          label="操作"
                          width="120">
          <template slot-scope="scope">
            <div class="oprate">
              <el-button @click="getInfo(scope.row.doctor_id, scope.row.source)"
                         type="text">查看详情</el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialogVisible"
                 append-to-body
                 title="医生详情"
                 v-if="dialogVisible"
                 width="580px">
      <doctor-detail :info="currentDoctorInfo"
                     @update="update"></doctor-detail>
    </PeaceDialog>
    <!-- 导入医生 -->
    <PeaceDialog :before-close="close"
                 append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="doctorsImportDialogVisible"
                 title="批量导入医生"
                 v-if="doctorsImportDialogVisible"
                 width="720px">
      <DoctorsImport @close="closeDoctorsImportDialog"
                     @success="upSuccess" />
    </PeaceDialog>
    <!-- 医生详情-注册 -->
    <PeaceDialog :before-close="close"
                 append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="doctorsAuditDialogVisible"
                 title="医生详情"
                 v-if="doctorsAuditDialogVisible"
                 width="500px">
      <DoctorsAudit :info.sync="currentDoctorInfo"
                    :entryinfo.sync="currentDoctorEntryInfo"
                    @closeDoctorsAuditDialog="closeDoctorsAuditDialog"
                    @close="closeDoctorsAuditDialog" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import DoctorDetail from './components/DoctorDetail'
import DoctorsImport from './components/DoctorsImport'
import DoctorsAudit from './components/DoctorsAudit'

export default {
  name: 'DoctorsList',
  components: { DoctorDetail, DoctorsImport, DoctorsAudit },
  data() {
    return {
      source: {
        ENUM_ACCOUNT_STATUS: CONSTANT.ENUM_ACCOUNT_STATUS,
        ENUM_DOCTOR_SOURCE: CONSTANT.ENUM_DOCTOR_SOURCE,
        ENUM_PASS_STATUS: CONSTANT.ENUM_PASS_STATUS
      },
      list: [],
      timeRange: [],
      secondDeptList: [],
      model: {
        name: '',
        tel: '',
        source: '',
        passStatus: '',
        useStatus: '',
        hospital: '',
        nethospital: '',
        timeStart: '',
        timeEnd: '',
        depNameId: ''
      },
      currentDoctorInfo: '',
      currentDoctorEntryInfo: '',

      doctorsImportDialogVisible: false,
      dialogVisible: false,
      doctorsAuditDialogVisible: false
    }
  },
  watch: {
    timeRange(timeRange) {
      if (Array.isArray(timeRange)) {
        this.model.timeStart = timeRange[0] ? timeRange[0] : ''
        this.model.timeEnd = timeRange[1] ? timeRange[1] : ''
      } else {
        this.model.timeStart = ''
        this.model.timeEnd = ''
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getSecondDept()
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getDoctorList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    //获取二级科室列表接口
    getSecondDept() {
      const params = {}
      Service.getSecondDept(params).then((res) => {
        this.secondDeptList = res.data
      })
    },

    close(done) {
      this.getList()
      done()
    },
    /* 批量导入医生 */
    // 打开 Dialog
    openDoctorsImportDialog() {
      this.doctorsImportDialogVisible = true
    },
    // 关闭 Dialog
    closeDoctorsImportDialog() {
      this.doctorsImportDialogVisible = false
    },
    //导入成功
    upSuccess() {
      this.doctorsImportDialogVisible = false
      this.getList()
    },
    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>医生批量导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}nethospital/excel/doctor.xls`
        window.open(url, '_blank')
        this.$alert('', '医生批量导入模板获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },

    getInfo(id, type) {
      type = type || ''
      Service.getDoctorInfo({ id: id })
        .then((res) => {
          const data = res.data
          this.currentDoctorInfo = data
          if (type == 2) {
            this.getEntryDetail(id)
            this.openDoctorsAuditDialog()
          } else {
            this.dialogVisible = true
          }
        })
        .catch(() => {
          this.dialogVisible = false
        })
    },
    getEntryDetail(id) {
      Service.getEntryDetail({ doctorId: id }).then((res) => {
        this.currentDoctorEntryInfo = res.data
      })
    },
    update(id) {
      this.getInfo(id)
      this.getList()
    },
    /*医生入驻审核*/
    openDoctorsAuditDialog() {
      this.doctorsAuditDialogVisible = true
    },
    //关闭 Dialog
    closeDoctorsAuditDialog() {
      this.doctorsAuditDialogVisible = false
      this.getList()
    },
    changeStatus(row) {
      const handle = () => {
        const params = new FormData()
        params.append('doctorId', row.doctor_id)
        params.append('status', row.status)

        Service.upDoctorStatus(params).then((res) => {
          this.$message.success(res.msg)
          this.getList()
        })
      }

      if (row.status === 0) {
        this.$confirm('停用后医生将不能再登录医生端应用且无法被患者查看，是否确认停用？', '提示', {
          closeOnClickModal: false
        })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      } else {
        this.$confirm('启用后医生将允许登录医生端应用且被患者查看，是否确认启用？', '提示', {
          closeOnClickModal: false
        })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      }
    }
  }
}
</script>

<style scoped>
.top-menu {
  margin-bottom: 20px;
}
.error-info {
  width: 300px;
  padding-bottom: 40px;
  margin: 0 auto;
  font-size: 14px;
  color: #333;
  line-height: 32px;
  text-align: left;
}

.alert-text {
  word-break: break-all;
}
</style>