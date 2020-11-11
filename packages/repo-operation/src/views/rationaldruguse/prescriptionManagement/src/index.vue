<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model">
        <el-form-item label="处方编码：">
          <el-input v-model="model.prescriptionNo"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="机构名称：">
          <el-select v-model="model.hosCode"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in remoteSource.organizationList"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处方来源：">
          <el-select v-model="model.prescriptionSource"
                     placeholder="不限">
            <el-option v-for="(value, label) in source.SOURCES_PRESCRIPTION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科室：">

          <el-autocomplete v-bind:readonly="true"
                           v-model="localModel.deptName"
                           :fetch-suggestions="remoteDepartmentList"
                           value-key="Name"
                           placeholder="请选择"
                           @select="handleDeptCodeSelect"
                           clearable></el-autocomplete>

        </el-form-item>

        <el-form-item label="提交方式：">
          <el-select v-model="model.submitType"
                     placeholder="全部">
            <el-option v-for="(value, label) in source.SUBMISSION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处方状态：">
          <el-select v-model="model.prescriptionState"
                     placeholder="全部">
            <el-option v-for="(value, label) in source.PRESCRIPTION_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="审核通过方式：">
          <el-select v-model="model.pharmacistCheckMode"
                     placeholder="全部">
            <el-option v-for="(value, label) in source.AUDIT_MODE_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="系统审方结果：">
          <el-select v-model="model.actionMsg"
                     placeholder="全部">
            <el-option v-for="(value, label) in source.SYSTEM_AUDIT_RESULTS_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="药师审方结果：">
          <el-select v-model="model.pharmacistCheckResult"
                     placeholder="全部">
            <el-option v-for="(value, label) in source.RESULTS_AUDIT_PHARMACIST_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="患者名称：">
          <el-input v-model="model.patientName"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="处方创建日期：">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.timeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item label="审方药师：">
          <el-select v-model="model.pharmacistCode"
                     placeholder="请选择"
                     clearable>

            <el-option v-for="item in remoteSource.pharmacistList"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处方类别：">
          <el-select v-model="model.prescriptionType"
                     placeholder="请选择">
            <el-option v-for="(value, label) in source.PRESCRIPTION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     style="width: 80px;"
                     v-on:click="get">查询</el-button>

          <el-button style="width: 80px;"
                     v-on:click="resert">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="data-over">

        <div class="item">
          <span>全部处方：</span>
          <span>{{ dataOver.total || 0 }}</span>
        </div>

        <div class="item">
          <span>待审核处方：</span>
          <span>{{ dataOver.noCheck || 0 }}</span>
        </div>

        <div class="item">
          <span>质疑中处方：</span>
          <span>{{ dataOver.question || 0 }}</span>
        </div>

        <div class="item">
          <span>双签提交处方：</span>
          <span>{{ dataOver.pass || 0 }}</span>
        </div>

        <div class="item">
          <span>未通过处方：</span>
          <span>{{ dataOver.reject || 0 }}</span>
        </div>

        <div class="item">
          <span>已通过处方：</span>
          <span>{{ dataOver.pass || 0 }}</span>
        </div>

        <div class="item">
          <span>已作废处方：</span>
          <span>{{ dataOver.invalid || 0 }}</span>
        </div>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  stripe>

        <el-table-column label="处方编号"
                         align="center"
                         prop="prescriptionNo"
                         min-width="160px"></el-table-column>

        <el-table-column label="处方状态"
                         align="center"
                         prop="stateName"
                         min-width="100px"></el-table-column>

        <el-table-column label="药师审方结果"
                         align="center"
                         prop="pharmacistExamineResult"
                         min-width="120px"></el-table-column>

        <el-table-column label="系统审方结果"
                         align="center"
                         prop="examineResult"
                         min-width="120px"></el-table-column>

        <el-table-column label="处方创建时间"
                         align="center"
                         prop="createTime"
                         min-width="160px"></el-table-column>

        <el-table-column label="机构名称"
                         align="center"
                         prop="organName"
                         min-width="120px"></el-table-column>

        <el-table-column label="患者姓名"
                         align="center"
                         prop="patientName"
                         min-width="100px"></el-table-column>

        <el-table-column label="开方医生"
                         min-width="100px"
                         prop="doctorName"
                         align="center"></el-table-column>

        <el-table-column label="科室"
                         align="center"
                         prop="deptName"
                         min-width="100px"></el-table-column>

        <el-table-column label="处方类别"
                         align="center"
                         prop="prescriptionType"
                         min-width="100px"></el-table-column>

        <el-table-column label="处方来源"
                         align="center"
                         prop="prescriptionSource"
                         min-width="100px"></el-table-column>

        <el-table-column label="审核通过方式"
                         align="center"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.pharmacistCheckMode || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="提交方式"
                         align="center"
                         prop="submitMode"
                         min-width="100px"></el-table-column>

        <el-table-column label="审方药师"
                         align="center"
                         min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.pharmacyName || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="审方时间"
                         align="center"
                         prop="pharmacistExamTime"
                         min-width="160px"></el-table-column>

        <el-table-column label="操作"
                         align="center"
                         fixed="right"
                         width="100px">

          <template slot-scope="scope">

            <el-button type="text"
                       v-on:click="detail(scope.row)">查看详情</el-button>

          </template>

        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 原始处方 -->
    <template>
      <PeaceDialog title="原始处方"
                   :visible.sync="dialog.visible"
                   append-to-body
                   v-show="dialog.visible&&dialog.data.show">
        <el-image v-bind:src="dialog.data.prescriptionImageUrl"
                  v-on:load="onLoad"></el-image>
      </PeaceDialog>
    </template>
  </div>
</template>

<script>
import Service from './service'
import CONSTANT from './constant'

export default {
  data() {
    return {
      model: {
        actionMsg: '',
        auditorSettings: '',
        deptCode: '',
        hosCode: '',
        pharmacistCode: '',
        prescription: '',
        prescriptionState: '',
        prescriptionNo: '',
        pharmacistCheckMode: '',
        prescriptionSource: -1,
        timeRange: [],
        startTime: '',
        endTime: '',
        submitType: '',
        patientName: '',
        pharmacistCheckResult: 0,
        prescriptionType: -1
      },

      localModel: {
        deptName: ''
      },

      source: {
        // 系统审核结果类型
        SYSTEM_AUDIT_RESULTS_TYPE: CONSTANT.SYSTEM_AUDIT_RESULTS_TYPE,
        //处方状态
        PRESCRIPTION_STATUS: CONSTANT.PRESCRIPTION_STATUS,
        //审核模式
        AUDIT_MODE_TYPE: CONSTANT.AUDIT_MODE_TYPE,
        //处方来源
        SOURCES_PRESCRIPTION_TYPE: CONSTANT.SOURCES_PRESCRIPTION_TYPE,
        //提交方式
        SUBMISSION_TYPE: CONSTANT.SUBMISSION_TYPE,
        //药师审核结果
        RESULTS_AUDIT_PHARMACIST_TYPE: CONSTANT.RESULTS_AUDIT_PHARMACIST_TYPE,
        // 处方类型
        PRESCRIPTION_TYPE: CONSTANT.PRESCRIPTION_TYPE
      },

      remoteSource: {
        organizationList: [],
        // departmentList: [],
        pharmacistList: []
      },

      dataOver: {},

      dialog: {
        visible: false,
        data: {
          prescriptionImageUrl: '',
          show: false
        }
      }
    }
  },

  beforeMount() {
    this.$nextTick().then(() => {
      this.remoteOrganizationList()
      this.remotePharmacist()
      this.get()
    })
  },

  watch: {
    /*
     *  科室数据根据 （ 机构编码 hosCode & 处方来源 prescriptionSource）请求接口获取
     *
     *  因为 el-autocomplete 不支持 el-select 类似的形式所以分开存放（科室编码 | 科室名称）
     *  model --> deptCode 存放的是科室的编码
     *  localModel --> deptName 存放的是科室的名称
     *
     *  这里监听 (机构、处方来源) 的变化重置（科室编码 deptCode | 科室名称 deptName）
     */

    'model.hosCode': {
      handler() {
        this.model.deptCode = ''
        this.localModel.deptName = ''
      }
    },

    'model.prescriptionSource': {
      handler() {
        this.model.deptCode = ''
        this.localModel.deptName = ''
      }
    },

    'model.timeRange'(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },

  methods: {
    //获取处方列表
    get() {
      const fetch = Service.getPrescriptionList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        this.dataOver = res.data.statisticalResults
        return res
      })
    },

    resert() {
      this.model = {
        actionMsg: '',
        auditorSettings: '',
        deptCode: '',
        hosCode: '',
        pharmacistCode: '',
        prescription: '',
        prescriptionNo: '',
        pharmacistCheckMode: '',
        prescriptionSource: -1,
        timeRange: [],
        startTime: '',
        endTime: '',
        submitType: '',
        patientName: '',
        pharmacistCheckResult: 0,
        prescriptionType: -1
      }
      this.get()
    },
    //获取机构列表
    remoteOrganizationList() {
      Service.getOrganizationList({}).then((res) => {
        this.remoteSource.organizationList = res.data?.list
      })
    },
    //获取科室列表
    remoteDepartmentList(queryString, callback) {
      const params = {
        custCode: this.model.hosCode,
        source: this.model.prescriptionSource
      }

      Service.getDepartmentList(params).then((res) => {
        let list = res.data?.list || []
        if (list.length == 0) {
          list = [{ Name: '全部', Code: '' }]
        }
        callback(list)
      })
    },
    //获取药师列表
    remotePharmacist() {
      Service.getPharmacistList({}).then((res) => {
        this.remoteSource.pharmacistList = res.data?.list
      })
    },
    // 科室选择回调
    handleDeptCodeSelect(item) {
      const { Code } = item
      if (!Peace.validate.isEmpty(Code)) {
        this.model.deptCode = Code
      }
    },
    //处方详情
    detail(row) {
      const params = { JZTClaimNo: row.jztClaimNo }
      Service.getPrescriptionDetail(params).then((res) => {
        this.dialog.data.prescriptionImageUrl = res.data.prescriptionImageUrl

        this.dialog.visible = true
      })
    },

    onLoad() {
      this.dialog.data.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.data-over {
  display: flex;
  flex-wrap: wrap;

  > .item {
    color: var(--q-color-grey-666);
    font-size: 13px;
    margin-right: 30px;
  }

  margin-bottom: 20px;
}
</style>