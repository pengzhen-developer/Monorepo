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

          <el-form-item label="机构类型">

            <el-cascader v-model="model.institutionTypeCode" :props="props" :show-all-levels="false"
                         clearable style="width: 210px"></el-cascader>

          </el-form-item>

          <el-form-item label="机构性质">

            <PeaceSelect v-model="model.institutionWayCode"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.xinZhiList"
                         v-bind:key="item.code"
                         v-bind:label="item.name"
                         v-bind:value="item.code"></el-option>
            </PeaceSelect>

          </el-form-item>

          <el-form-item label="更新时间">
            <PeaceDatePicker v-model="updateTime"
                             end-placeholder="结束时间"
                             start-placeholder="开始时间"
                             type="daterange"
                             value-format="yyyy-MM-dd"></PeaceDatePicker>
          </el-form-item>

          <el-form-item label="关联应用">

            <PeaceSelect v-model="model.applicationCode"
                         clearable
                         filterable
                         placeholder="全部">
              <el-option v-for="item in source.applicationList"
                         v-bind:key="item.channelSourceCode"
                         v-bind:label="item.channelSourceName"
                         v-bind:value="item.channelSourceCode"></el-option>
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
                            min-width="140"
                            prop="institutionName"></PeaceTableColumn>
          <PeaceTableColumn label="机构类型"
                            min-width="100"
                            prop="institutionTypeName"></PeaceTableColumn>
          <PeaceTableColumn label="机构性质"
                            prop="institutionWayName"
                            width="140"></PeaceTableColumn>
          <PeaceTableColumn label="关联应用"
                            min-width="140"
                            prop="applicationName"></PeaceTableColumn>
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
                         v-on:click="showDetail(scope.row)">查看详情
              </el-button>
            </template>
          </PeaceTableColumn>

        </PeaceTable>

      </div>

    </div>

    <org-detail v-if="orgDetailOptions.show && orgDetailOptions.orgCode" v-bind:orgCode="orgDetailOptions.orgCode"
                v-on:close="close"></org-detail>

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
      updateTime: [],
      model: {
        institutionName: undefined,
        institutionTypeCode: undefined,
        institutionWayCode: undefined,
        startTime: undefined,
        endTime: undefined,
        applicationCode: undefined
      },
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const {level, value} = node;
          const tmp = await Service.queryDictCascade({codeTableName: 'D0312004', parentRangeCode: value})
          const nodes = tmp.data ?? []
          const data = nodes.map((item) => ({
            value: item.code,
            label: item.name,
            leaf: level >= 2
          }))
          resolve(data)
        }
      },
      source: {
        xinZhiList: [],
        applicationList: []
      },
      orgDetailOptions: {
        show: false,
        orgCode: undefined,
      },
    }
  },

  watch: {
    updateTime(val) {
      this.model.startTime = val?.[0] ?? undefined
      this.model.endTime = val?.[1] ?? undefined
    }
  },

  async mounted() {

    this.$nextTick().then(() => {
      this.fetch()
    })

    const xinZhiList = await Service.getDictionary({codeTableName: 'D0312016'})
    const applicationList = await Service.getApplicationDictionary()

    this.source.xinZhiList = xinZhiList.data ?? []
    this.source.applicationList = applicationList.data ?? []

  },

  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const { institutionTypeCode } = this.model
      if (institutionTypeCode && Array.isArray(institutionTypeCode) && institutionTypeCode.length === 3) {
        params.institutionTypeCode = institutionTypeCode[2]
      } else {
        params.institutionTypeCode = undefined
      }
      const fetch = Service.getOrgList
      this.$refs.table.reloadData({fetch, params})
    },
    reset() {
      const resetParams = {
        institutionName: undefined,
        institutionTypeCode: undefined,
        institutionWayCode: undefined,
        startTime: undefined,
        endTime: undefined,
        applicationCode: undefined
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
//::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
//  background-color: #1890ff !important;
//}
</style>
