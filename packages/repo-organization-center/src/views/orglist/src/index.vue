<template>
  <div class="full-height">
    <div v-show="!orgDetailOptions.show" class="layout-route">

      <div class="card card-search q-mb-md">

        <el-form v-bind:model="model"
                 inline="inline"
                 label-width="auto"
                 v-on:submit.native.prevent
                 v-on:keyup.enter.native="fetch"
                 label-suffix="："
                 size="mini">

          <el-form-item label="机构名称">
            <PeaceInput v-model.trim="model.institutionName"
                        maxlength="50"
                        clearable
                        placeholder="请输入"></PeaceInput>
          </el-form-item>

          <el-form-item label="机构类型">

            <PeaceSelect clearable
                         filterable
                         placeholder="全部"
                         v-model="model.institutionType">
              <el-option v-for="item in source.typeList"
                         v-bind:key="item.code"
                         v-bind:label="item.name"
                         v-bind:value="item.code"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item label="机构性质">

            <PeaceSelect clearable
                         filterable
                         placeholder="全部"
                         v-model="model.institutionWay">
              <el-option v-for="item in source.xinZhiList"
                         v-bind:key="item.code"
                         v-bind:label="item.name"
                         v-bind:value="item.code"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item label="更新时间">
            <PeaceDatePicker type="daterange"
                             v-model="model.updateTime"
                             value-format="yyyy-MM-dd"
                             start-placeholder="开始时间"
                             end-placeholder="结束时间"></PeaceDatePicker>
          </el-form-item>

          <el-form-item label="关联应用">

            <PeaceSelect clearable
                         filterable
                         placeholder="全部"
                         v-model="model.channelSourceName">
              <el-option v-for="item in source.applicationList"
                         v-bind:key="item.channelSourceCode"
                         v-bind:label="item.channelSourceName"
                         v-bind:value="item.channelSourceCode"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item>
            <el-button v-on:click="reset">重置</el-button>
            <el-button type="primary"
                       v-on:click="fetch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">

        <PeaceTable ref="table"
                    style="width: 100%"
                    pagination>

          <PeaceTableColumn label="机构名称"
                            min-width="140"
                            prop="institutionName"></PeaceTableColumn>
          <PeaceTableColumn label="机构类型"
                            min-width="80"
                            prop="institutionTypeName"></PeaceTableColumn>
          <PeaceTableColumn label="机构性质"
                            width="140"
                            prop="institutionWay"></PeaceTableColumn>
          <PeaceTableColumn label="关联应用"
                            min-width="140"
                            prop="channelSourceName"></PeaceTableColumn>
          <PeaceTableColumn label="最后更新时间"
                            min-width="160"
                            prop="updateTime"></PeaceTableColumn>
          <PeaceTableColumn label="更新来源"
                            min-width="100"
                            prop="sourceName"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            min-width="100">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="showDetail(scope.row)">查看详情</el-button>
            </template>
          </PeaceTableColumn>

        </PeaceTable>

      </div>

    </div>

    <org-detail v-if="orgDetailOptions.show && orgDetailOptions.orgCode" v-bind:orgCode="orgDetailOptions.orgCode" v-on:close="close"></org-detail>

  </div>
</template>

<script>
import Service from './service'
import orgDetail from '@src/views/orgDetail'
export default {
  name: 'orgList',
  components: {
    orgDetail
  },
  data() {
    return {
      model: {
        institutionName: undefined,
        institutionType: undefined,
        institutionWay: undefined,
        updateTime: undefined,
        channelSourceName: undefined
      },
      source: {
        typeList: [],
        xinZhiList: [],
        applicationList: []
      },
      orgDetailOptions: {
        show: false,
        orgCode: undefined,
      },
    }
  },

  created() {
    this.fetch()
  },

  async mounted() {

    const typeList = await Service.getDictionary({ codeTableName: 'D0312004' })
    const xinZhiList = await Service.getDictionary({ codeTableName: 'D0312016' })
    const applicationList = await Service.getApplicationDictionary()

    this.source.typeList = typeList.data ?? []
    this.source.xinZhiList = xinZhiList.data ?? []
    this.source.applicationList = applicationList.data ?? []
  },

  methods: {
    fetch() {
      // const token = Peace.tools.queryUrlParam('token')

      // if (Peace.validate.isEmpty(token)) {
      //   return
      // }

      const params = {}
      const fetch = Service.getOrgList
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        console.log(res.data)
      })
    },
    reset() {
      const resetParams = {
        institutionName: undefined,
        institutionType: undefined,
        institutionWay: undefined,
        updateTime: undefined,
        channelSourceName: undefined
      }
      this.model = Object.assign(resetParams)
    },
    showDetail(row) {
      this.orgDetailOptions.orgCode = row.institutionCode
      this.orgDetailOptions.show = true
    },
    close() {
      this.orgDetailOptions = {
        show: false,
        orgCode: undefined,
      }
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1890ff !important;
}
</style>
