<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-suffix="："
               label-width="auto"
               inline>
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.hosName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处方状态">
          <el-select v-model="model.prescripStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_PRESCRIPTION_STATUS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处方购药状态">
          <el-select v-model="model.orderDrugStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ORDERDRUG_STATUS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开具时间">
          <PeaceDatePicker v-model="model.time"
                           type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="至今"
                           value-format="yyyy-MM-dd"
                           :picker-options="pickerOptions">
          </PeaceDatePicker>
        </el-form-item>
        <el-form-item label="处方编号">
          <el-input v-model.trim="model.prescripNo"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input v-model.trim="model.doctorName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="就诊人姓名">
          <el-input v-model.trim="model.patientName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开方场景">
          <el-select v-model="model.prescriptionScene"
                     clearable
                     placeholder="全部">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ORDERSCENET_STATUS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button v-on:click="exportFile">导出</el-button>
      </div>
      <peace-table ref="table"
                   pagination>

        <peace-table-column prop="hosName"
                            label="机构名称"
                            min-width="180">
        </peace-table-column>
        <peace-table-column prop="prescriptionNo"
                            label="处方编号"
                            min-width="180">
        </peace-table-column>

        <peace-table-column prop="doctorName"
                            label="开具医生"
                            min-width="120">
        </peace-table-column>

        <peace-table-column prop="netDeptChild"
                            label="科室"
                            min-width="120">
        </peace-table-column>

        <peace-table-column prop="patientName"
                            label="就诊人"
                            min-width="120">
        </peace-table-column>

        <peace-table-column prop="prescriptionSceneText"
                            label="开方场景"
                            min-width="120">
        </peace-table-column>

        <peace-table-column prop="prescripStatus"
                            label="处方状态"
                            min-width="120">
        </peace-table-column>

        <peace-table-column prop="orderStatus"
                            min-width="160"
                            label="处方购药状态">
        </peace-table-column>

        <peace-table-column prop="createdTime"
                            label="开具时间"
                            min-width="180">
        </peace-table-column>
        <peace-table-column fixed="right"
                            label="操作"
                            min-width="120">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="viewRpInfo(scope.row)">处方详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <!-- 处方详情 -->
    <peace-dialog append-to-body
                  title="处方详情"
                  v-if="presDialogVisible"
                  v-bind:visible.sync="presDialogVisible">
      <PeacePrescriptionDetail v-bind:data="currentPres"></PeacePrescriptionDetail>
    </peace-dialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'

import { PeacePrescriptionDetail } from 'peace-components'

export default {
  name: 'prescription-records',
  components: {
    PeacePrescriptionDetail
  },

  data() {
    return {
      source: {
        ENUM_PRESCRIPTION_STATUS: CONSTANT.ENUM_PRESCRIPTION_STATUS,
        ENUM_ORDERDRUG_STATUS: CONSTANT.ENUM_ORDERDRUG_STATUS,
        ENUM_ORDERSCENET_STATUS: []
      },
      model: {
        hosName: '',
        prescripStatus: '',
        orderDrugStatus: '',
        time: [],
        startDate: '',
        endDate: '',
        prescripNo: '',
        doctorName: '',
        patientName: '',
        prescriptionScene: ''
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28')
        }
      },
      presDialogVisible: false,
      currentPres: ''
    }
  },
  watch: {
    ['model.time']() {
      this.model.startDate = this.model.time ? this.model.time[0] : ''
      this.model.endDate = this.model.time ? this.model.time[1] : ''
    }
  },

  async mounted() {
    this.source.ENUM_ORDERSCENET_STATUS = await Peace.identity.dictionary.getList('prescription_scene_type')
    this.$nextTick().then(() => {
      this.get()
    })
  },
  methods: {
    exportFile() {
      const params = Peace.util.deepClone(this.model)
      Service.isExistList(params).then(() => {
        Service.exportFile(params)
      })
    },
    get() {
      const fetch = Service.getPrescribeList
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },
    viewRpInfo(data) {
      const fetch = async () => {
        const params = { prescriptionNo: data.prescribeId }
        const res = await Service.getPrescriptionDetail(params)

        return res.data
      }

      this.presDialogVisible = true
      this.currentPres = fetch
    }
  }
}
</script>

<style lang="scss" scoped>
</style>