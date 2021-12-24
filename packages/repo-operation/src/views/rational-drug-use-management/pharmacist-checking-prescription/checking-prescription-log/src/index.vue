<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini">

        <el-form-item label="审方编号：">
          <peace-input v-model.trim="model.code"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="原始处方编号：">
          <peace-input v-model.trim="model.hisEpCode"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="调用渠道：">
          <peace-input v-model.trim="model.businessChannel"
                       placeholder="请输入"></peace-input>
        </el-form-item>

        <el-form-item label="提交时间：">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label="开方机构：">
          <peace-input v-model.trim="model.organName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="提交方式：">
          <peace-select v-model="model.submitType"
                        placeholder="全部">
            <el-option v-for="(value, label) in source.SUBMISSION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="调用结果：">
          <el-select v-model="model.invokeResult"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.INVOKE_RESULTY_TYPE"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get"
                     v-bind:loading="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column min-width="260px"
                         label="审方编号"
                         prop="code">
        </el-table-column>
        <el-table-column min-width="180px"
                         label="原始处方编号">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="detail(scope.row)">{{ scope.row.hisEpCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column min-width="140px"
                         label="调用渠道">
          <template slot-scope="scope">
            {{scope.row.businessChannel ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="180px"
                         label="提交时间"
                         prop="createTime"></el-table-column>
        <el-table-column min-width="160px"
                         label="开方机构">
          <template slot-scope="scope">
            {{scope.row.organName ||  '--' }}
          </template>
        </el-table-column>
        <PeaceTableColumn label="提交方式"
                          min-width="100px">
          <template slot-scope="scope">
            {{ scope.row.submitType || '--' }}
          </template>
        </PeaceTableColumn>
        <el-table-column min-width="90px"
                         label="调用结果"
                         prop="invokeResult">
          <template slot-scope="scope">
            {{scope.row.invokeResult ||  '--' }}
          </template>
        </el-table-column>
        <PeaceTableColumn label="审方方案"
                          min-width="120px">
          <template slot-scope="scope">
            {{scope.row.prescriptionCheckPlan ||  '--' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审方团队"
                          min-width="160px">
          <template slot-scope="scope">
            <el-popover placement="bottom-start"
                        popper-class="bottom-start"
                        width="165"
                        trigger="hover"
                        v-if="scope.row.prescriptionCheckTeam">
              <div>{{ scope.row.prescriptionCheckTeam}}</div>
              <div class="ellipsis"
                   slot="reference">{{scope.row.prescriptionCheckTeam}}</div>
            </el-popover>
            <div v-else>--</div>
          </template>
        </PeaceTableColumn>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'
import CONSTANT from './constant'
export default {
  name: 'CallLog',
  inject: ['provideAddTab', 'provideGetTab'],
  data() {
    return {
      loading: false,
      DateValue: [],
      source: {
        INVOKE_RESULTY_TYPE: [],
        //提交方式
        SUBMISSION_TYPE: CONSTANT.SUBMISSION_TYPE
      },
      model: {
        beginTime: '',
        endTime: '',
        code: '',
        businessChannel: '',
        organName: '',
        hisEpCode: '',
        invokeResult: '',
        submitType: ''
      },
      modelVisible: {
        visible: false,
        data: {}
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.beginTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  computed: {
    addTab() {
      return this.provideAddTab
    },
    getTab() {
      return this.provideGetTab
    }
  },
  async created() {
    this.source.INVOKE_RESULTY_TYPE = await Peace.identity.dictionary.getList('invoke_result_type')
  },
  mounted() {
    this.$nextTick().then(() => {
      //获取列表
      this.get()
    })
  },
  methods: {
    get() {
      //获取调用日志列表
      this.loading = true
      const fetch = Service.getInvokeLogs
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    detail(row) {
      const tab = Peace.util.deepClone(this.getTab('PrescriptionRecord'))
      Peace.cache.sessionStorage.set('358-jztClaimNo', row.jztClaimNo)
      tab.menuName = '处方记录'
      this.addTab(tab)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
