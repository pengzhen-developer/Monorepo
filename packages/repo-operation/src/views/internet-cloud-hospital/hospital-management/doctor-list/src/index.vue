<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               inline>
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名"
                    v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"
                    v-model="model.tel"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select clearable
                     v-model="model.is_pass">
            <el-option :key="status.value"
                       :label="status.label"
                       :value="status.value"
                       v-for="status in source.passStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select clearable
                     v-model="model.status">
            <el-option :key="status.value"
                       :label="status.label"
                       :value="status.value"
                       v-for="status in source.doctorStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在医院">
          <el-input placeholder="请输入"
                    v-model="model.hospital"></el-input>
        </el-form-item>
        <el-form-item label="互联网医院">
          <el-input placeholder="请输入"
                    v-model="model.nethospital"></el-input>
        </el-form-item>
        <el-form-item label="申请入驻时间">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.timeRange"
                             start-placeholder="选择日期"
                             end-placeholder="选择日期"></peace-date-picker>
        </el-form-item>
        <el-form-item label-width="">
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <!-- <div class="q-mb-md">
        <el-button v-on:click="openDoctorsImportDialog"
                   type="primary">批量导入</el-button>
        <el-button v-on:click="download"
                   type="primary">导入模板下载</el-button>
      </div> -->
      <PeaceTable ref="table"
                  class="table"
                  pagination>
        <PeaceTableColumn label="姓名"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="手机号"
                          min-width="120"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn label="所在医院"
                          width="150"
                          prop="hospital_name"></PeaceTableColumn>
        <PeaceTableColumn label="互联网医院"
                          width="150"
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
        <PeaceTableColumn label="医生来源"
                          min-width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.source | filterDictionary(source.doctorSource) }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审核状态"
                          min-width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.is_pass | filterDictionary(source.passStatus) }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          min-width="90px">
          <template slot-scope="scope">
            <el-switch @change="changeStatus(scope.row)"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#3099a6"
                       v-if="!((scope.row.is_pass=='wait'&&scope.row.source==2)||(scope.row.is_pass=='off'&&scope.row.source==2))"
                       v-model="scope.row.status"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_pass=='wait'&&scope.row.source==2"
                       @click="getDoctorInfo(scope.row.doctor_id,scope.row.source, true)"
                       type="text">审核</el-button>
            <el-button v-else
                       @click="getDoctorInfo(scope.row.doctor_id,scope.row.source)"
                       type="text">查看详情</el-button>

          </template>
        </PeaceTableColumn>
      </PeaceTable>

      <!-- 导入医生 -->
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :before-close="close"
                    :visible.sync="doctorsImportDialogVisible"
                    title="批量导入医生"
                    v-if="doctorsImportDialogVisible"
                    append-to-body
                    width="500px">
        <DoctorsImport @close="closeDoctorsImportDialog" />
      </peace-dialog>

      <!-- 医生详情-导入 -->
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="doctorInfoDialogVisible"
                    append-to-body
                    title="医生详情"
                    v-if="doctorInfoDialogVisible"
                    width="600px">
        <DoctorInfo :info.sync="currentDoctorInfo"
                    @update="update" />
      </peace-dialog>

      <!-- 新增医生 -->
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :before-close="close"
                    :visible.sync="doctorAddDialogVisible"
                    title="新增医生"
                    v-if="doctorAddDialogVisible"
                    append-to-body
                    width="600px">
        <DoctorModel @close="closeDoctorAddDialog" />
      </peace-dialog>

      <!-- 医生详情-注册 -->
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :before-close="close"
                    :visible.sync="doctorsAuditDialogVisible"
                    title="医生详情"
                    v-if="doctorsAuditDialogVisible"
                    append-to-body
                    width="600px">
        <DoctorsAudit :info.sync="currentDoctorInfo"
                      :entryinfo.sync="currentDoctorEntryInfo"
                      @closeDoctorsAuditDialog="closeDoctorsAuditDialog"
                      @close="closeDoctorsAuditDialog" />
      </peace-dialog>
    </div>
  </div>
</template>

<script>
import Service from './service'
import Constant from './constants'

import DoctorInfo from './components/DoctorInfo'
import DoctorModel from './components/DoctorModel'
import DoctorsImport from './components/DoctorsImport'
import DoctorsAudit from './components/DoctorsAudit'
export default {
  name: 'doctor-list',
  components: { DoctorInfo, DoctorModel, DoctorsImport, DoctorsAudit },
  data() {
    return {
      model: {
        name: '',
        tel: '',
        source: '',
        timeRange: [],
        timeStart: '',
        timeEnd: '',
        hospital: '',
        nethospital: '',
        is_pass: '',
        status: '',
        p: 1,
        size: 10
      },
      source: {
        passStatus: Constant.PASS_STATUS,
        doctorStatus: Constant.DOCTOR_STATUS,
        doctorSource: Constant.DOCTOR_SOURCE
      },
      doctorsImportDialogVisible: false,
      doctorInfoDialogVisible: false,
      doctorAddDialogVisible: false,
      doctorsAuditDialogVisible: false,
      currentDoctorInfo: '',
      currentDoctorEntryInfo: ''
    }
  },
  watch: {
    'model.timeRange'(timeRange) {
      this.model.timeStart = timeRange?.[0] ?? ''
      this.model.timeEnd = timeRange?.[1] ?? ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getDoctorList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },
    // 获取医生详情信息
    getDoctorInfo(id, type) {
      type = type || ''
      const params = { doctor_id: id }
      Service.getDoctorInfo(params).then((res) => {
        const info = res.data && res.data.length > 0 ? res.data[0] : ''
        this.currentDoctorInfo = info
        if (type == 2) {
          this.getEntryDetail(id)
          this.openDoctorsAuditDialog()
        } else {
          this.openDoctorInfoDialog()
        }
      })
    },
    getEntryDetail(id) {
      const params = { doctorId: id }
      Service.getEntryDetail(params).then((res) => {
        this.currentDoctorEntryInfo = res.data
      })
    },
    close(done) {
      this.fetch()
      done()
    },
    update(id) {
      this.getDoctorInfo(id)
      this.fetch()
    },
    /* 批量导入医生 */
    // 打开 Dialog
    openDoctorsImportDialog() {
      this.doctorsImportDialogVisible = true
    },
    // 关闭 Dialog
    closeDoctorsImportDialog() {
      this.doctorsImportDialogVisible = false
      this.fetch()
    },
    // 打开 Dialog
    openDoctorInfoDialog() {
      this.doctorInfoDialogVisible = true
    },
    // 关闭 Dialog
    closeDoctorInfoDialog() {
      this.currentDoctorInfo = ''
      this.doctorInfoDialogVisible = false
    },

    /* 新增医生 */
    // 打开 Dialog
    openDoctorAddDialog() {
      this.doctorAddDialogVisible = true
    },
    // 关闭 Dialog
    closeDoctorAddDialog() {
      this.doctorAddDialogVisible = false
      this.fetch()
    },

    /*医生入驻审核*/
    openDoctorsAuditDialog() {
      this.doctorsAuditDialogVisible = true
    },
    //关闭 Dialog
    closeDoctorsAuditDialog() {
      this.doctorsAuditDialogVisible = false
      this.fetch()
    },
    // 更新医生状态
    changeStatus(row) {
      const handle = () => {
        const params = new FormData()
        params.append('doctorId', row.doctor_id)
        params.append('status', row.status)

        Service.upDoctorStatus(params).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      }

      if (row.status === 0) {
        this.$confirm('停用后医生将不能再登录医生端应用且无法被患者查看，是否确认停用？', '提示', {
          closeOnClickModal: false,
          closeOnPressEscape: false
        })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      } else {
        this.$confirm('启用后医生将允许登录医生端应用且被患者查看，是否确认启用？', '提示', {
          closeOnClickModal: false,
          closeOnPressEscape: false
        })
          .then(() => {
            handle()
          })
          .catch(() => {
            row.status = row.status === 1 ? 0 : 1
          })
      }
    },

    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>医生批量导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}nethospital/excel/doctor.xls`
        window.open(url, '_blank')
        this.$notify({
          title: '医生批量导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
      })
    }
  }
}
</script>

<style>
</style>