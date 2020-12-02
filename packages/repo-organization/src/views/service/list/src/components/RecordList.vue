<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline
               label-position="left"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">提交时间</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <peace-date-picker type="daterange"
                             v-model="model.pickDate"
                             value-format="yyyy-MM-dd"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期">
          </peace-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span class="text-justify em-4">状态</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-select v-model="model.checkStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in options"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     style="min-width: 80px;"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="serviceName"
                         label="服务名称"
                         min-width="180px">
        </el-table-column>
        <el-table-column prop="applyTime"
                         label="提交时间"
                         min-width="180px">
        </el-table-column>
        <el-table-column label="状态"
                         min-width="100px">
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
                         label="审核时间"
                         min-width="180px">
        </el-table-column>
        <el-table-column align="center"
                         fixed="right"
                         label="操作"
                         width="120px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <peace-dialog v-if="detailDialog.visible"
                  title="申请开通详情"
                  width="344px"
                  v-bind:visible.sync="detailDialog.visible">
      <RecordDetail v-bind:data="detailDialog.data"></RecordDetail>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './../service'
import RecordDetail from './RecordDetail'

export default {
  components: {
    RecordDetail
  },

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
      ],
      detailDialog: {
        visible: false,
        data: {}
      }
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
      this.$refs.table.reloadData({ fetch, params })
    },

    getStatusForCode(code) {
      return this.options.find((item) => item.value == code).label
    },
    getClassForCode(code) {
      return this.options.find((item) => item.value == code).class
    },
    toDetail(row) {
      this.detailDialog.visible = true
      this.detailDialog.data = row
    }
  }
}
</script>

<style lang="scss" scoped>
.status-item {
  display: flex;
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

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}
</style>