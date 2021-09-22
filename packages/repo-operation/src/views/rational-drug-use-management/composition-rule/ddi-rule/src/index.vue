<template>
  <div class="layout-route full-width flex">
    <div class="full-width bg-white">
      <div class="title-style">
        <div class="rule-title">通用相互作用规则</div>
        <div>相互作用规则为成分与成分之间的相互作用。药品维护了成分信息之后 ,可依据通用相互作用规则进行审查</div>
      </div>
      <div style="borderTop:16px solid #f5f5f5;"></div>
      <div class="card-style">
        <div class="q-mb-md">
          <el-button type="primary"
                     v-on:click="openEditlDialog({},'add')">新增</el-button>
        </div>
        <PeaceTable ref="table"
                    pagination
                    emptyText="暂无通用相互作用规则哦~">
          <PeaceTableColumn label="序号"
                            type="index"
                            width="80px">
            <template slot-scope="{ $index, _self }">
              {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="成分/成分类别"
                            prop="ddiItemInfos"
                            min-width="200px">
            <template slot-scope="scope">
              <div class="info-styles">{{scope.row.ddiItemInfos}}</div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="相互作用的成分/成分类别"
                            prop="ddiContraryInfos"
                            min-width="200px">
            <template slot-scope="scope">
              <div class="info-styles">{{scope.row.ddiContraryInfos}}</div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="提示级别"
                            min-width="100px">
            <template slot-scope="scope">
              {{ scope.row.warningLevel| filterDictionary(source.warningLevel,'') }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="提示内容"
                            min-width="200px">
            <template slot-scope="scope">
              <div class="info-styles">{{ scope.row.description || '--' }}</div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            prop="updateTime"
                            min-width="180px">
          </PeaceTableColumn>
          <PeaceTableColumn label="状态"
                            prop="isDelete"
                            min-width="130px">
            <template slot-scope="scope">
              <div class="table-status">
                <div class="table-status-text">{{scope.row.isDelete==='no'?'启用':'禁用'}}</div>
                <el-switch v-model="scope.row.isDelete"
                           active-value="no"
                           inactive-value="yes"
                           v-on:change="changeStatus(scope.row)"></el-switch>
              </div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            fixed="right"
                            align="left"
                            width="220px">
            <template slot-scope="scope">
              <el-button class="q-px-none"
                         type="text"
                         v-on:click="toDetail(scope.row)">查看详情</el-button>
              <el-button class="q-px-none"
                         type="text"
                         v-on:click="openEditlDialog(scope.row,'edit')">修改</el-button>
              <el-button class="q-px-none"
                         type="text"
                         v-on:click="toLog(scope.row)">查看日志</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>

      </div>

      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="editModelDialog.visible"
                    v-bind:title="editModelDialog.type==='add'?'新增相互作用规则':'修改相互作用规则'"
                    v-if="editModelDialog.visible"
                    append-to-body
                    width="624px">
        <EditModel v-bind:info="editModelDialog.data"
                   v-bind:type="editModelDialog.type"
                   v-on:cancel="cancel"
                   v-on:complete="complete" />
      </peace-dialog>

      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="detailModelDialog.visible"
                    title="查看详情"
                    v-if="detailModelDialog.visible"
                    append-to-body
                    width="576px">
        <DetailModel v-bind:info="detailModelDialog.data" />
      </peace-dialog>

      <general-rule-log v-if="logOptions.showLog"
                        v-bind:visible.sync="logOptions.showLog"
                        v-bind:data="logOptions.data"></general-rule-log>

    </div>
  </div>
</template>

<script>
import Service from './service/index'
import EditModel from './components/EditModel'
import GeneralRuleLog from './components/GeneralRuleLog'
import DetailModel from './components/DetailModel'
export default {
  name: 'DdiRule',
  components: {
    EditModel,
    GeneralRuleLog,
    DetailModel
  },
  data() {
    return {
      source: {
        warningLevel: []
      },
      editModelDialog: {
        visible: false,
        type: '',
        info: {}
      },
      logOptions: {
        showLog: false,
        data: {}
      },
      detailModelDialog: {
        visible: false,
        data: {}
      }
    }
  },
  async created() {
    this.source.warningLevel = await Peace.identity.dictionary.getList('warning_level')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getDdiRuleList
      this.$refs.table.reloadData({ fetch })
    },
    openEditlDialog(info, type) {
      this.editModelDialog.visible = true
      this.editModelDialog.data = info
      this.editModelDialog.type = type
    },
    toLog(row) {
      this.logOptions.data = row
      this.logOptions.showLog = true
    },
    toDetail(row) {
      this.detailModelDialog.visible = true
      this.detailModelDialog.data = row
    },
    changeStatus(row) {
      const message = row.isDelete === 'no' ? '启用后该规则将进行审查，是否确定启用该规则？' : '禁用后该规则将不再审查，是否确定禁用该规则？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            ruleId: row.ruleId,
            isDelete: row.isDelete
          }
          Service.changeStatus(params).then((res) => {
            Peace.util.success(res.message)
            this.fetch()
          })
        })
        .catch(() => {
          row.isDelete = row.isDelete === 'no' ? 'yes' : 'no'
        })
    },
    cancel() {
      this.editModelDialog.visible = false
    },
    complete() {
      this.editModelDialog.visible = false
      this.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.title-style {
  background: #fff;
  padding: 24px 16px;
}
.rule-title {
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 8px;
}
.card-style {
  background: #fff;
  padding: 24px;
}
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
.info-styles {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>