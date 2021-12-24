<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="原始处方编号：">
          <peace-input v-model.trim="model.hisEpCode"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="审方编号：">
          <peace-input v-model.trim="model.code"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="调用渠道：">
          <peace-input v-model.trim="model.businessChannel"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="开方机构：">
          <peace-input v-model.trim="model.hospitalName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="调用时间：">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
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
        <el-form-item label="审方结果：">
          <el-select v-model="model.checkResult"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.CHECK_RESULTY_TYPE"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="错误类型：">
          <el-cascader :options="options"
                       :props="props"
                       collapse-tags
                       clearable
                       style="width:210px"
                       ref="myCascader"
                       popper-class="popperClass"></el-cascader>
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
                         label="审方编号">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="detail(scope.row)">{{ scope.row.code  }}</el-button>
          </template>
        </el-table-column>
        <el-table-column min-width="240px"
                         label="平台处方编号"
                         prop="jztClaimNo"></el-table-column>
        <el-table-column min-width="180px"
                         label="原始处方编号">
          <template slot-scope="scope">
            {{scope.row.hisEpCode ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="120px"
                         label="调用渠道">
          <template slot-scope="scope">
            {{scope.row.businessChannel ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         label="开方机构">
          <template slot-scope="scope">
            {{scope.row.name ||  '--' }}
          </template>
        </el-table-column>

        <el-table-column min-width="180px"
                         label="调用时间"
                         prop="createTime"></el-table-column>
        <el-table-column min-width="90px"
                         label="调用结果"
                         prop="invokeResult">
          <template slot-scope="scope">
            {{scope.row.invokeResult ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="90px"
                         label="审方结果">
          <template slot-scope="scope">
            {{scope.row.checkResult ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="120px"
                         label="一级错误类型">
          <template slot-scope="scope">
            {{scope.row.firstLevelError ||  '--' }}
          </template>
        </el-table-column>

        <el-table-column min-width="120px"
                         label="二级错误类型">
          <template slot-scope="scope">

            <el-popover placement="bottom-start"
                        popper-class="bottom-start"
                        width="165"
                        trigger="hover"
                        v-if="scope.row.secondLevelError">
              <div>{{ scope.row.secondLevelError}}</div>
              <div class="ellipsis"
                   slot="reference">{{scope.row.secondLevelError}}</div>
            </el-popover>
            <div v-else>--</div>
          </template>
        </el-table-column>

      </PeaceTable>
    </div>

    <!-- 调用详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="modelVisible.visible"
                  title="调用详情"
                  v-if="modelVisible.visible"
                  append-to-body
                  width="576px">
      <CallDetail v-bind:data="modelVisible.data"></CallDetail>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'
import CallDetail from './components/CallDetail'
export default {
  name: 'CallLog',
  components: { CallDetail },

  data() {
    return {
      loading: false,
      DateValue: [],
      source: {
        INVOKE_RESULTY_TYPE: [],
        CHECK_RESULTY_TYPE: []
      },
      model: {
        startTime: '',
        endTime: '',
        code: '',
        businessChannel: '',
        hospitalName: '',
        hisEpCode: '',
        checkResult: '',
        invokeResult: ''
      },
      modelVisible: {
        visible: false,
        data: {}
      },
      props: { multiple: true, value: 'code', label: 'name' },
      options: []
    }
  },
  watch: {
    DateValue(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },
  async created() {
    this.source.INVOKE_RESULTY_TYPE = await Peace.identity.dictionary.getList('invoke_result_type')
    this.source.CHECK_RESULTY_TYPE = await Peace.identity.dictionary.getList('check_result_type')
  },
  mounted() {
    this.$nextTick().then(() => {
      //获取错误类型
      this.getInvokeLogLevelDic()
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
      const checksNodes = this.$refs.myCascader.getCheckedNodes()
      params.firstLevelError = checksNodes
        .filter((item) => item.level === 1)
        .map((item) => item.value)
        .join(',')
      params.secondLevelError = checksNodes
        .filter((item) => item.level === 2)
        .map((item) => item.value)
        .join(',')
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    getInvokeLogLevelDic() {
      Service.getInvokeLogLevelDic().then((res) => {
        this.options = res.data
      })
    },
    detail(row) {
      this.modelVisible.data = {
        id: row.id,
        jztClaimNo: row.jztClaimNo
      }
      this.modelVisible.visible = true
    }
  }
}
</script>


<style lang="scss" >
.popperClass {
  .el-checkbox {
    margin-right: 0 !important;
  }
}
</style>