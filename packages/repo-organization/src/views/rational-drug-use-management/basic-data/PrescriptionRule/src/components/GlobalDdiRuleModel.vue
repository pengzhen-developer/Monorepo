<template>
  <div>
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
          <div class="info-styles"> {{ scope.row.description || '--' }}</div>
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="操作"
                        fixed="right"
                        align="left"
                        width="100px">
        <template slot-scope="scope">
          <el-button class="q-px-none"
                     type="text"
                     v-on:click="toDetail(scope.row)">查看详情</el-button>
        </template>
      </PeaceTableColumn>
    </PeaceTable>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="detailModelDialog.visible"
                  title="查看详情"
                  v-if="detailModelDialog.visible"
                  append-to-body
                  width="576px">
      <GlobalDdiRuleDetailModel v-bind:info="detailModelDialog.data" />
    </peace-dialog>
  </div>
</template>

<script>
import GlobalDdiRuleDetailModel from './GlobalDdiRuleDetailModel'
import Service from '../service/index'
export default {
  components: {
    GlobalDdiRuleDetailModel
  },
  data() {
    return {
      model: {
        isDelete: 'no'
      },
      source: {
        warningLevel: []
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
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    toDetail(row) {
      this.detailModelDialog.visible = true
      this.detailModelDialog.data = row
    }
  }
}
</script>

<style lang="scss" scoped>
.info-styles {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>