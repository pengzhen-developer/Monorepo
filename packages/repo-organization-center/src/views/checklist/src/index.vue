<template>

  <div class="full-height overflow-auto">

    <div v-show="!orgDetailOptions.show" class="layout-route">
      <div class="card card-search q-mb-md">

        <el-form inline="inline"
                 label-suffix="："
                 label-width="auto"
                 size="mini"
                 v-bind:model="model"
                 v-on:submit.native.prevent
                 v-on:keyup.enter.native="fetch">

          <el-form-item label="机构名称">
            <PeaceInput v-model.trim="model.institutionName"
                        clearable
                        maxlength="50"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="审核类型">

            <PeaceSelect v-model="model.auditerType"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.auditTypeList"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </PeaceSelect>


          </el-form-item>

          <el-form-item label="应用来源">

            <PeaceSelect v-model="model.channelSourceCode"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.applicationList"
                         v-bind:key="item.channelSourceCode"
                         v-bind:label="item.channelSourceName"
                         v-bind:value="item.channelSourceCode"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item label="更新时间">
            <PeaceDatePicker v-model="updateTime"
                             end-placeholder="结束时间"
                             start-placeholder="开始时间"
                             type="daterange"
                             value-format="yyyy-MM-dd"></PeaceDatePicker>
          </el-form-item>

          <el-form-item label="审核状态">

            <PeaceSelect v-model="model.auditStatus"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.auditStatusList"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item>
            <el-button v-on:click="reset">重置</el-button>
            <el-button type="primary"
                       v-on:click="fetch">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">

        <PeaceTable ref="table"
                    pagination
                    style="width: 100%">
          <PeaceTableColumn label="机构名称"
                            min-width="120"
                            prop="institutionName"/>

          <PeaceTableColumn label="审核类型"
                            min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.auditerType | auditName }}</span>
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="提交时间"
                            min-width="120"
                            prop="checkTime"/>

          <PeaceTableColumn label="应用来源"
                            prop="channelSourceName"
                            width="140"/>

          <PeaceTableColumn label="审核状态"
                            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.auditStatus | checkStatus }}</span>
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="审核人"
                            min-width="100"
                            prop="auditerName"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            min-width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.auditStatus === 'report'"
                         type="text"
                         v-on:click="showDetail(scope.row)">审核
              </el-button>
              <el-button v-else
                         type="text"
                         v-on:click="showDetail(scope.row)">查看详情
              </el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>

    </div>

    <org-check v-if="orgDetailOptions.show && orgDetailOptions.orgCode" v-bind:orgCode="orgDetailOptions.orgCode" v-on:close="close" v-on:refresh="refresh"></org-check>

  </div>
</template>

<script>
import Service from './service'
import orgCheck from '@src/views/orgCheck'
export default {
  name: 'checkList',
  components: {
    orgCheck
  },
  data() {
    return {
      updateTime: [],
      model: {
        institutionName: undefined,
        auditerType: undefined,
        channelSourceCode: undefined,
        auditStatus: undefined,
        startTime: undefined,
        endTime: undefined,
      },
      source: {
        auditTypeList: [],
        auditStatusList: [],
        applicationList: []
      },
      orgDetailOptions: {
        show: false,
        orgCode: undefined,
      },
    }
  },
  async mounted() {
    this.source.auditTypeList = await Peace.identity.dictionary.getList('auditer_type')
    this.source.auditStatusList = await Peace.identity.dictionary.getList('audit_status')
    const applicationList = await Service.getApplicationDictionary()
    this.source.applicationList = applicationList.data ?? []

    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  filters: {
    checkStatus: function (value) {
      return {success: '成功', fail: "失败", report: '待审核'}[value]
    },
    auditName: function (value) {
      return value === 'save' ? '机构入驻' : '修改信息'
    }
  },

  watch: {
    updateTime(val) {
      this.model.startTime = val?.[0] ?? undefined
      this.model.endTime = val?.[1] ?? undefined
    }
  },

  methods: {
    fetch() {
      const params = Object.assign(this.model)
      const fetch = Service.getOrgList
      this.$refs.table.reloadData({fetch, params})
    },
    reset() {
      const resetParams = {
        institutionName: undefined,
        auditerType: undefined,
        channelSourceCode: undefined,
        auditStatus: undefined,
        startTime: undefined,
        endTime: undefined,
      }
      this.model = Object.assign(resetParams)
      this.updateTime = []
    },
    showDetail(row) {
      this.orgDetailOptions.orgCode = `${row.id}`
      this.orgDetailOptions.show = true
    },
    refresh() {
      this.close()
      this.fetch()
    },
    close() {
      this.orgDetailOptions = {
        show: false,
        orgCode: undefined,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
//  background-color: #1890ff !important;
//}
</style>
