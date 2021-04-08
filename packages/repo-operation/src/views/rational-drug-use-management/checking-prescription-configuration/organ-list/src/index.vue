<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini">
        <el-form-item label="处方来源机构">
          <el-input v-model.trim="model.sourceHospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="审方机构">
          <el-input v-model.trim="model.checkHospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-bind:disabled="searching"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="处方来源机构"
                          prop="SourceHospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn width="260px"
                          label="审方机构"
                          prop="CheckHospitalNames">
          <template slot-scope="scope">
            {{ getName(scope.row) }} </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="审方方案数目"
                          prop="ProjectCount"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">审方团队</el-button>
            <el-button type="text"
                       v-on:click="redirect(scope.row)">审方方案</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="detailDialog.visible"
                 width="480px"
                 v-bind:visible.sync="detailDialog.visible"
                 title="审方团队配置">
      <ReviewDetail v-bind:data="detailDialog.data"
                    v-on:on-close="onClose"></ReviewDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import ReviewDetail from './components/ReviewDetail'
import Service from './service'

export default {
  name: 'OrganList',
  inject: ['provideAddTab', 'provideGetTab'],
  components: {
    ReviewDetail
  },
  data() {
    return {
      searching: false,

      model: {
        sourceHospitalName: '',
        checkHospitalName: ''
      },

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
  computed: {
    addTab() {
      return this.provideAddTab
    },
    getTab() {
      return this.provideGetTab
    }
  },
  methods: {
    get() {
      const fetch = Service.getList
      const params = this.model

      this.searching = true
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.searching = false
      })
    },

    // 基本信息
    toDetail(row) {
      this.detailDialog.visible = true
      this.detailDialog.data = { code: row.SourceHospitalCode, name: row.SourceHospitalName }
    },

    onClose() {
      this.detailDialog.visible = false
      this.get()
    },
    //跳转审方方案
    redirect(row) {
      const tab = Peace.util.deepClone(this.getTab('CheckingPrescriptionPlan'))
      Peace.cache.sessionStorage.set('242-hospitalCode', row.SourceHospitalCode)
      Peace.cache.sessionStorage.set('242-hospitalName', row.SourceHospitalName)

      tab.menuName = row.SourceHospitalName
      this.addTab(tab)
    },

    getName(row) {
      return row.CheckHospitalNames == null || row.CheckHospitalNames == '' ? '——' : row.CheckHospitalNames
    }
  }
}
</script>

<style lang="scss" scoped>
</style>