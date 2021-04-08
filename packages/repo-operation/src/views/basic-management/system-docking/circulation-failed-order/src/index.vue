<template>
  <div class="flex full-width">
    <div class="layout-route full-width">

      <div class="card card-search q-mb-md">
        <el-form v-bind:model="model"
                 inline="inline"
                 label-suffix="："
                 size="mini">
          <el-form-item label="医院订单编号">
            <el-input v-model.trim="model.CustOrderKey"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="医院名称">
            <el-input v-model.trim="model.MedicalInstitutionName"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="异常类型">
            <el-select v-model="model.ErrorType"
                       placeholder="全部"
                       clearable>
              <el-option v-for="item  in source.ErrorTypeDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="同步状态">
            <el-select v-model="model.SycnStatus"
                       placeholder="全部"
                       clearable>
              <el-option v-for="item in source.SycnStatusDict"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首次同步时间">
            <PeaceDatePicker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="timeRange"></PeaceDatePicker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       v-on:click="fetch">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="card">
        <PeaceTable ref="table"
                    pagination
                    size="mini">
          <PeaceTableColumn label="序号"
                            type="index"
                            width="80px">
            <template slot-scope="{ $index, _self }">
              {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="医院订单编号"
                            prop="CustOrderKey"
                            width="260px">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="showDetail(scope.row)">{{scope.row.CustOrderKey}}</el-button>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="医院名称"
                            prop="MedicalInstitutionName"
                            min-width="160px">
            <template slot-scope="scope">
              {{ scope.row.MedicalInstitutionName || '--' }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="订单总额"
                            prop="OrderAmount"
                            min-width="140px">
          </PeaceTableColumn>
          <PeaceTableColumn label="异常类型"
                            prop="dockingSystem"
                            width="140px">
            <template slot-scope="scope">
              {{scope.row.ErrorType | getLabel(source.ErrorTypeDict)}}
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="同步状态"
                            prop="SycnStatus"
                            width="140px">
            <template slot-scope="scope">
              <div v-bind:class="scope.row.SycnStatus==0?'red':'grey'">
                {{scope.row.SycnStatus | getLabel(source.SycnStatusDict)}}
              </div>
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="首次同步时间"
                            prop="CreateTime"
                            width="180px"></PeaceTableColumn>
        </PeaceTable>
      </div>

    </div>

    <!-- 查看详情 -->
    <PeaceDialog width="1000px"
                 v-bind:visible.sync="dialog.visible"
                 title="订单详情">
      <AbnormalCirculationOrderDetail v-bind:data="dialog.data"
                                      v-bind:dictdata="source"></AbnormalCirculationOrderDetail>
    </PeaceDialog>

  </div>
</template>

<script>
import AbnormalCirculationOrderDetail from './components/AbnormalCirculationOrderDetail'
import Service from './service'
export default {
  name: 'CirculationFailedOrder',
  components: {
    AbnormalCirculationOrderDetail
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      },

      source: {
        SycnStatusDict: [],
        ErrorTypeDict: []
      },
      model: {
        CustOrderKey: '',
        MedicalInstitutionName: '',
        SycnStatus: '',
        ErrorType: '',
        StartTime: '',
        EndTime: ''
      },
      timeRange: []
    }
  },
  watch: {
    timeRange(timeRange) {
      this.model.StartTime = timeRange?.[0] ?? ''
      this.model.EndTime = timeRange?.[1] ?? ''
    }
  },
  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value == value)?.label
    }
  },
  async created() {
    this.source.SycnStatusDict = await Peace.identity.dictionary.getList('SycnStatus')
    this.source.ErrorTypeDict = await Peace.identity.dictionary.getList('ErrorType')

    await this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Service.ErrorOrderListToOrder
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    showDetail(data) {
      Service.ErrorOrderDetails({ ID: data.ID }).then((res) => {
        this.dialog.data = res.data
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
</style>