 <template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model">
        <el-form-item label="业务名称：">
          <el-select placeholder="全部"
                     v-model="model.businessModule"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_BUSINESSSYSTEM_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能名称：">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="操作类型：">
          <el-select placeholder="全部"
                     v-model="model.operationType"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_ACTIONTYPE_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="操作日期：">
          <el-date-picker type="daterange"
                          v-model="model.timeRange"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column width="60px"
                         label="序号"
                         align="center"
                         type="index"></el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="业务名称"
                         prop=""></el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="功能名称"
                         prop=""></el-table-column>
        <el-table-column min-width="160px"
                         align="center"
                         label="操作类型"
                         prop=""></el-table-column>
        <el-table-column min-width="160px"
                         align="center"
                         label="操作人"
                         prop=""></el-table-column>
        <el-table-column width="160px"
                         align="center"
                         label="操作时间"
                         prop=""></el-table-column>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import CONSTANT from './constant'
export default {
  name: 'LoggerRecordList',

  data() {
    return {
      timeRange: [],
      source: {
        ENUM_BUSINESSSYSTEM_STATUS: CONSTANT.ENUM_BUSINESSSYSTEM_STATUS,
        ENUM_ACTIONTYPE_STATUS: CONSTANT.ENUM_ACTIONTYPE_STATUS
      },
      model: {
        businessModule: '',
        operationType: '',
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
  }
}
</script>

<style>
</style>