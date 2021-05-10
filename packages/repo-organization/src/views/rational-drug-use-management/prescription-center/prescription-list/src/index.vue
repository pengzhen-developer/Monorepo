<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="处方编号：">
          <el-input v-model.trim="model.preNo"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="审方机构：">
          <el-select placeholder="全部"
                     v-model="model.hosCode"
                     clearable
                     filterable>
            <el-option v-for="item in source.hosCode"
                       v-bind:key="item.patentid"
                       v-bind:label="item.custName"
                       v-bind:value="item.patentid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处方来源：">
          <el-select v-model="model.preSource"
                     placeholder="不限"
                     clearable>
            <el-option v-for="item in source.preSource"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室：">
          <el-select v-model="model.deptCode"
                     placeholder="全部"
                     clearable
                     filterable>
            <el-option v-for="(item, index) in source.deptCode"
                       v-bind:key="index"
                       v-bind:label="item.MedicalDepartmentName"
                       v-bind:value="item.MedicalDepartmentCode">{{item.MedicalDepartmentName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交方式：">
          <el-select placeholder="全部"
                     v-model="model.submitType"
                     clearable>
            <el-option v-for="item in source.submitType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处方状态：">
          <el-select placeholder="全部"
                     v-model="model.preState"
                     clearable>
            <el-option v-for="item in source.preState"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核通过方式：">
          <el-select placeholder="全部"
                     v-model="model.checkMode"
                     clearable>
            <el-option v-for="item in source.checkMode"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统审方结果：">
          <el-select v-model="model.sysCheckResult"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.sysCheckResult"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药师审方结果：">
          <el-select v-model="model.phaCheckResult"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.phaCheckResult"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者名称：">
          <el-input v-model.trim="model.patientName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="处方创建日期：">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label="审方药师：">
          <el-select v-model="model.phaCode"
                     placeholder="全部"
                     clearable
                     filterable>
            <el-option v-for="item in source.phaCode"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处方类别：">
          <el-select v-model="model.preType"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.preType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开方应用：">
          <el-input v-model.trim="model.preApplyName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

          <el-button v-on:click="resert">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="info row q-mb-10">
        <p>全部处方：{{statistic.total}}</p>
        <p>待审核处方：{{statistic.noCheck}}</p>
        <p>质疑中处方：{{statistic.question}}</p>
        <p>双签提交处方：{{statistic.appeal}}</p>
        <p>未通过处方：{{statistic.reject}}</p>
        <p>已通过处方：{{statistic.pass}}</p>
        <p>已作废处方：{{statistic.invalid}}</p>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
        </el-table-column>
        <el-table-column min-width="160px"
                         label="处方编号">
          <template slot-scope="scope">
            {{scope.row.preNo ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="开方应用">
          <template slot-scope="scope">
            {{scope.row.preApplyName ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="开方医生">
          <template slot-scope="scope">
            {{scope.row.doctorName ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         label="科室">
          <template slot-scope="scope">
            {{scope.row.deptName ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="患者姓名">
          <template slot-scope="scope">
            {{scope.row.patientName ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         label="处方类别">
          <template slot-scope="scope">
            {{scope.row.preType | getLabel(source.preType)}}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="处方来源">
          <template slot-scope="scope">
            {{scope.row.preSource ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="160px"
                         label="处方创建时间">
          <template slot-scope="scope">
            {{scope.row.preTime ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         label="提交方式">
          <template slot-scope="scope">
            {{scope.row.submitType | getLabel(source.submitType)}}
          </template>
        </el-table-column>
        <el-table-column min-width="110px"
                         label="审核通过方式">
          <template slot-scope="scope">
            {{scope.row.checkMode | getLabel(source.checkMode)}}
          </template>
        </el-table-column>
        <el-table-column min-width="150px"
                         label="审方机构">
          <template slot-scope="scope">
            {{scope.row.examineHosName  ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         label="审方药师">
          <template slot-scope="scope">
            {{scope.row.phaName  ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column width="110px"
                         label="系统审方结果">
          <template slot-scope="scope">
            {{scope.row.sysCheckResult  ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column width="110px"
                         label="药师审方结果">
          <template slot-scope="scope">
            <div class="row"
                 style="align-items: center">
              <div class="q-mr-8"
                   v-if="canShowResult(scope.row.phaCheckResult,scope.row.preImageUrl)">{{scope.row.phaCheckResult | getLabel(source.phaCheckResult)  }}</div>
              <img src="./assets/img/icon_pdf.png"
                   v-if="scope.row.preImageUrl"
                   v-on:click="showImage(scope.row)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="160px"
                         label="审方时间"
                         prop="pharmacistExamTime">
          <template slot-scope="scope">
            {{scope.row.pharmacistExamTime ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="处方状态">
          <template slot-scope="scope">
            {{scope.row.preState | getLabel(source.preState)}}
          </template>
        </el-table-column>
        <el-table-column min-width="80px"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="detail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!--查看原始处方-->
    <PeaceDialog title="原始处方"
                 :visible.sync="dialog.visible"
                 append-to-body
                 v-show="dialog.visible&&dialog.show">
      <el-image v-bind:src="dialog.preImageUrl"
                v-on:load="onLoad"></el-image>
    </PeaceDialog>

  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'
export default {
  name: 'PrescriptionCenter',
  components: {},

  data() {
    return {
      dialog: {
        visible: false,
        show: false,
        preImageUrl: ''
      },
      DateValue: [],
      source: {
        hosCode: [], //审方机构
        deptCode: [], //科室
        phaCode: [], //审方药师
        preSource: [], //处方来源
        submitType: [], //提交方式
        preState: [], //处方状态
        checkMode: [], //审核通过方式
        sysCheckResult: [], //系统审方结果
        phaCheckResult: [], //药师审方结果
        preType: [] //处方类别
      },
      statistic: {},
      model: {
        startTime: '',
        endTime: '',
        preNo: '',
        hosCode: '',
        preSource: '',
        deptCode: '',
        submitType: '',
        preState: '',
        checkMode: '',
        sysCheckResult: '',
        phaCheckResult: '',
        patientName: '',
        phaCode: '',
        preType: '',
        preApplyName: ''
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value === value)?.label ?? '--'
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      //获取字典(处方来源  提交方式 处方状态 审核通过方式 系统审方结果 药师审方结果  处方类别)
      this.source.preSource = await Peace.identity.dictionary.getList('prescription_source')
      this.source.submitType = await Peace.identity.dictionary.getList('submit_type')
      this.source.preState = await Peace.identity.dictionary.getList('prescription_state')
      this.source.checkMode = await Peace.identity.dictionary.getList('check_mode')
      this.source.sysCheckResult = await Peace.identity.dictionary.getList('sys_check_result')
      this.source.phaCheckResult = await Peace.identity.dictionary.getList('pha_check_result')
      this.source.preType = await Peace.identity.dictionary.getList('prescription_type')

      //获取审方机构
      const params = {
        ClientID: Util.user.getUserInfo().custCode
      }
      Service.GetCustomerTeamRelaction(params).then((res) => {
        this.source.hosCode = JSON.parse(res.data.RelationJson)
      })

      //获取科室列表
      Service.GetDepartment().then((res) => {
        this.source.deptCode = res.data.list
      })

      //获取审方药师
      Service.CustPharmacistDicts().then((res) => {
        this.source.phaCode = res.data.list
      })
      if (this.$route.query.preState) {
        this.model.preState = this.$route.query.preState
      }
      //获取处方列表 处方统计结果
      this.get()
    })
  },

  methods: {
    canShowResult(value, image) {
      const result = this.source.phaCheckResult.find((item) => item.value === value)?.label ?? false
      if (!result) {
        return image ? false : true
      } else {
        return true
      }
    },
    get() {
      const params = Peace.util.deepClone(this.model)
      params.hosCodeOfUser = Util.user.getUserInfo().custCode
      params.type = 1

      //获取处方列表
      const fetch = Service.getPreList
      this.$refs.table.reloadData({ fetch, params })

      //处方统计结果
      Service.getPreStatisticResults(params).then((res) => {
        this.statistic = res.data
      })
    },
    //查看详情
    detail(row) {
      const name = '查看处方'
      const query = { JZTClaimNo: row.jztClaimNo }
      this.$router.push({ name, query })
    },
    //查看原始处方
    showImage(row) {
      this.dialog.preImageUrl = row.preImageUrl
      this.dialog.visible = true
    },
    onLoad() {
      this.dialog.show = true
    },
    resert() {
      this.DateValue = []
      this.model = {
        startTime: '',
        endTime: '',
        preNo: '',
        hosCode: '',
        preSource: '',
        deptCode: '',
        submitType: '',
        preState: '',
        checkMode: '',
        sysCheckResult: '',
        phaCheckResult: '',
        patientName: '',
        phaCode: '',
        preType: ''
      }
      this.get()
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.info p {
  margin-right: 30px;
}
</style>