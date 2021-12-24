<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="处方号：">
          <el-input v-model.trim="model.hisEpCode"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开方应用：">
          <el-input v-model.trim="model.preAppName"
                    placeholder="请输入"></el-input>
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
        <el-form-item label="智能审方结果：">
          <el-select v-model="model.checkResult"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in source.CHECK_RESULTY_TYPE"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调用时间：">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="DateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label="错误类型：">
          <el-cascader placeholder="全部"
                       ref='cascader'
                       collapse-tags
                       clearable
                       v-bind:options="source.INVOKE_LOG_LEVEL_DIC"
                       v-bind:props="{ value: 'code', label: 'name', multiple: true }"></el-cascader>
        </el-form-item>
        <el-form-item label
                      label-width="0">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="info row q-mb-10">
        <p>调用次数：{{statistic.invokeNums}}</p>
        <p>调用成功：{{statistic.invokeSuccessNums}}</p>
        <p>调用失败：{{statistic.invokeFailNums}}</p>
      </div>
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

        <el-table-column min-width="220px"
                         label="平台处方编号"
                         prop="jztClaimNo"></el-table-column>
        <el-table-column min-width="160px"
                         label="原始处方编号">
          <template slot-scope="scope">
            {{scope.row.hisEpCode ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="160px"
                         label="开方应用">
          <template slot-scope="scope">
            {{scope.row.preAppName ||  '--' }}
          </template>
        </el-table-column>

        <el-table-column min-width="170px"
                         label="调用时间"
                         prop="createTime"></el-table-column>
        <el-table-column min-width="90px"
                         label="调用结果"
                         prop="invokeResult">
          <template slot-scope="scope">
            {{scope.row.invokeResult ||  '--' }}
          </template>
        </el-table-column>
        <el-table-column min-width="120px"
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

            <template v-if="scope.row.secondLevelError">
              <el-popover popper-class="bottom-start"
                          placement="bottom-start"
                          width="165"
                          trigger="hover">
                <div>{{ scope.row.secondLevelError }}</div>
                <div class="ellipsis"
                     slot="reference">{{ scope.row.secondLevelError }}</div>
              </el-popover>
            </template>
            <template v-else>
              <span>--</span>
            </template>

          </template>
        </el-table-column>
        <el-table-column min-width="100px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="detail(scope.row)">查看详情</el-button>
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
import CONSTANT from './constant'
import Service from './service'
import CallDetail from './components/CallDetail'
export default {
  name: 'CallLog',
  components: { CallDetail },

  data() {
    return {
      DateValue: [],

      source: {
        SOURCE_STATUS: CONSTANT.SOURCE_STATUS,
        INVOKE_RESULTY_TYPE: [],
        CHECK_RESULTY_TYPE: [],
        INVOKE_LOG_LEVEL_DIC: []
      },
      statistic: {},
      model: {
        startTime: '',
        endTime: '',
        preAppName: '',
        hisEpCode: '',
        checkResult: '',
        invokeResult: ''
      },
      modelVisible: {
        visible: false,
        data: {}
      }
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
    this.source.INVOKE_LOG_LEVEL_DIC = (await Service.getInvokeLogLevelDic()).data
  },

  mounted() {
    this.$nextTick().then(async () => {
      // 获取处方列表 处方统计
      this.get()
    })
  },

  methods: {
    get() {
      //获取调用日志列表
      const fetch = Service.getInvokeLogs
      const params = Peace.util.deepClone(this.model)
      const checksNodes = this.$refs.cascader.getCheckedNodes()
      params.firstLevelError = checksNodes
        .filter((item) => item.level === 1)
        .map((item) => item.value)
        .join(',')
      params.secondLevelError = checksNodes
        .filter((item) => item.level === 2)
        .map((item) => item.value)
        .join(',')

      this.$refs.table.reloadData({ fetch, params })

      //调用统计
      const params2 = Peace.util.deepClone(this.model)
      Service.getInvokeStatistic(params2).then((res) => {
        this.statistic = res.data
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

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.info p {
  margin-right: 30px;
}
</style>