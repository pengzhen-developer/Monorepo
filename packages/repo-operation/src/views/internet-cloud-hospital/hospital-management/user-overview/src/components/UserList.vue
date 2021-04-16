<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-button plain
                 class="q-mb-lg"
                 v-on:click="back">
        <i class="el-icon-arrow-left"></i>
        返回上一页
      </el-button>
      <div class="text-center text-bold q-mt-12 q-mb-32 "
           style="font-size:24px;">{{hospitalName}}</div>
      <el-form :model="model"
               label-suffix="："
               inline>
        <el-form-item label="用户名">
          <el-input placeholder="请输入姓名"
                    v-model="model.patientName"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"
                    v-model.trim="model.tel"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="应用">
          <el-select v-model="model.mainPart"
                     placeholder="全部"
                     clearable>
            <el-option v-bind:key="'order'+item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-for="item in source.hospitalList"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="exportUserList">导出</el-button>
      </div>
      <PeaceTable ref="table"
                  class="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          width="80px"
                          prop="orderNumber"></PeaceTableColumn>
        <PeaceTableColumn label="用户名"
                          prop="patientName"></PeaceTableColumn>
        <PeaceTableColumn label="应用"
                          prop="mainPart"></PeaceTableColumn>
        <PeaceTableColumn label="渠道"
                          prop="channel"></PeaceTableColumn>
        <PeaceTableColumn label="落地页类型"
                          prop="typeName"
                          min-width="120px"></PeaceTableColumn>
        <PeaceTableColumn label="手机号"
                          prop="patientTel"
                          width="120"></PeaceTableColumn>
        <PeaceTableColumn label="家人">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.familyCount"
                       @click="getFamilys(scope.row.patientId)"
                       style="text-align:left;"
                       size="medium"
                       type="text">{{ scope.row.familyCount }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="处方量">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.prescribePrescripCount"
                       @click="getPres(scope.row.patientId)"
                       style="text-align:left;"
                       size="medium"
                       type="text">{{ scope.row.prescribePrescripCount }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="问诊">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.inquiryCount"
                       @click="getInquirys(scope.row.patientId)"
                       style="text-align:left;"
                       size="medium"
                       type="text">{{ scope.row.inquiryCount }}</el-button>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="服务包">
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.servicePackageCount"
                       @click="getService(scope.row.patientId)"
                       style="text-align:left;"
                       size="medium"
                       type="text">{{ scope.row.servicePackageCount }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="首次注册时间"
                          width="180px"
                          prop="registerTime"></PeaceTableColumn>
      </PeaceTable>
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="familyDialogVisible"
                    title="家人信息"
                    v-if="familyDialogVisible"
                    append-to-body
                    width="800px">
        <FamilyDetails :id="currentId" />
      </peace-dialog>
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="presDialogVisible"
                    title="处方信息"
                    v-if="presDialogVisible"
                    append-to-body
                    width="800px">
        <PresDetails :id="currentId" />
      </peace-dialog>
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="inquiryDialogVisible"
                    title="问诊信息"
                    v-if="inquiryDialogVisible"
                    append-to-body
                    width="800px">
        <InquiryDetails :id="currentId" />
      </peace-dialog>

      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="serviceDialogVisible"
                    title="服务包信息"
                    v-if="serviceDialogVisible"
                    append-to-body
                    width="800px">
        <ServiceDetails :id="currentId" />
      </peace-dialog>
    </div>
  </div>
</template>

<script>
import Service from '../service'

import FamilyDetails from './FamilyDetails.vue'
import PresDetails from './PresDetails.vue'
import InquiryDetails from './InquiryDetails.vue'
import ServiceDetails from './ServiceDetails'

export default {
  name: 'UserList',
  props: {
    info: Object
  },
  components: { FamilyDetails, PresDetails, InquiryDetails, ServiceDetails },
  data() {
    return {
      model: {
        patientName: '',
        tel: '',
        hosId: '',
        mainPart: ''
      },
      source: {
        hospitalList: []
      },
      currentId: '',
      familyDialogVisible: false,
      presDialogVisible: false,
      inquiryDialogVisible: false,
      serviceDialogVisible: false
    }
  },
  computed: {
    hospitalName() {
      return this.info?.hosName ?? ''
    },
    hospitalId() {
      return this.info?.hosId ?? ''
    }
  },
  async mounted() {
    this.source.hospitalList = await Peace.identity.dictionary.getList('main_part_type')
    this.model.hosId = this.hospitalId

    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    back() {
      this.$emit('goback')
    },
    exportUserList() {
      const params = Peace.util.deepClone(this.model)

      Service.exportUserList(params)
    },
    fetch() {
      const params = Peace.util.deepClone(this.model)

      const fetch = Service.getPatientInfoById
      this.$refs.table.reloadData({ fetch, params })
    },
    getFamilys(id) {
      this.currentId = id
      this.familyDialogVisible = true
    },
    getPres(id) {
      this.currentId = id
      this.presDialogVisible = true
    },
    getInquirys(id) {
      this.currentId = id
      this.inquiryDialogVisible = true
    },
    getService(id) {
      this.currentId = id
      this.serviceDialogVisible = true
    }
  }
}
</script>

<style>
</style>