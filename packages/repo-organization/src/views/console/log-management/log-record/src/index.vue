 <template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model">
        <el-form-item label="业务名称：">
          <el-select placeholder="全部"
                     v-model="model.bizModule"
                     clearable>
            <el-option v-for="item in source.ENUM_BIZMODULE_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能名称：">
          <el-input placeholder="请输入"
                    v-model="model.functionName"></el-input>
        </el-form-item>
        <el-form-item label="操作类型：">
          <el-select placeholder="全部"
                     v-model="model.optType"
                     clearable>
            <el-option v-for="item in source.ENUM_OPTTYPE_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="操作日期：">
          <peace-date-picker type="daterange"
                             v-model="timeRange"
                             value-format="yyyy-MM-dd"></peace-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-on:current-change="tt">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         label="业务名称"
                         prop="bizModule">
          <template slot-scope="scope">
            {{scope.row.bizModule | getLabel(source.ENUM_BIZMODULE_STATUS)}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         label="功能名称"
                         prop="functionName"></el-table-column>
        <el-table-column min-width="160px"
                         label="操作类型"
                         prop="optType">
          <template slot-scope="scope">
            {{scope.row.optType | getLabel(source.ENUM_OPTTYPE_STATUS)}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         label="备注"
                         prop="remarks"></el-table-column>
        <el-table-column min-width="160px"
                         label="操作人"
                         prop="createBy"></el-table-column>
        <el-table-column width="160px"
                         label="操作时间"
                         prop="createTime"></el-table-column>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'
import Util from '@src/util'
export default {
  name: 'LogRecord',

  data() {
    return {
      timeRange: [],
      source: {
        ENUM_BIZMODULE_STATUS: [],
        ENUM_OPTTYPE_STATUS: []
      },
      model: {
        serviceId: 'console',
        organCode: Util.user.getUserInfo().custCode,
        logType: 1,
        bizModule: '',
        functionName: '',
        optType: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  watch: {
    timeRange(timeRange) {
      this.model.startTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
  },
  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value === value)?.label
    }
  },
  async created() {
    this.source.ENUM_BIZMODULE_STATUS = await Peace.identity.dictionary.getList('console_business_module')
    this.source.ENUM_OPTTYPE_STATUS = await Peace.identity.dictionary.getList('operate_type')
    this.get()
  },
  methods: {
    get() {
      const fetch = Service.recordList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    tt() {
      debugger
    }
  }
}
</script>

<style>
</style>