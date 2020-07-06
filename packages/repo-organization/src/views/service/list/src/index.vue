<template>
  <div class="q-pa-lg">
    <el-form inline=""
             label-width="100px"
             label-position="right">
      <el-form-item label="提交时间：">
        <el-date-picker type="daterange"
                        v-model="model.pickDate"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态：">

        <el-select v-model="model.checkStatus"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     v-bind:key="item.value"
                     v-bind:label="item.label"
                     v-bind:value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column type="index"
                         fixed
                         align="center"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="serviceName"
                         align="center"
                         label="服务名称">
        </el-table-column>
        <el-table-column prop="applyTime"
                         align="center"
                         label="提交时间">
        </el-table-column>
        <el-table-column label="状态"
                         align="center">
          <template slot-scope="scope">
            <div class="status-item">
              <div v-bind:class="getClassForCode(scope.row.checkStatus)"></div>
              <span>
                {{ getStatusForCode(scope.row.checkStatus) }}
              </span>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="checkTime"
                         align="center"
                         label="审核时间">
        </el-table-column>
        <el-table-column width="300"
                         align="center"
                         label="备注">
          <template slot-scope="scope">
            <span>
              {{ getReason(scope.row.failureReason) }}
            </span>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

  </div>

</template>

<script>
import Service from './service'
import Peace from '@src/library'

export default {
  data() {
    return {
      model: {
        pickDate: [],
        startTime: '',
        endTime: '',
        checkStatus: ''
      },

      options: [
        {
          value: '1',
          label: '待审核',
          class: 'statusColor1'
        },
        {
          value: '2',
          label: '未通过',
          class: 'statusColor2'
        },
        {
          value: '3',
          label: '已通过',
          class: 'statusColor3'
        }
      ]
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getMyServiceList
      const params = this.model
      if (this.model.pickDate == null) {
        this.model.pickDate = ['', '']
      }
      const [start, end] = this.model.pickDate
      params.startTime = start
      params.endTime = end
      this.$refs.table.loadData({ fetch, params })
    },

    getStatusForCode(code) {
      return this.options.find((item) => item.value == code).label
    },
    getClassForCode(code) {
      return this.options.find((item) => item.value == code).class
    },
    getReason(reason) {
      if (Peace.validate.isEmpty(reason)) {
        return '—'
      }
      return reason
    }
  }
}
</script>

<style scoped>
.status-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.statusColor1 {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  margin-right: 8px;
  background: #faad14;
}
.statusColor2 {
  width: 6px;
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: #dddddd;
}
.statusColor3 {
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: var(--q-color-primary);
}
</style>