<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="85px"
             label-position="right"
             label-suffix
             size="mini">
      <el-form-item label="处方来源机构："
                    label-width="115px">
        <el-input v-model.trim="model.sourceHospitalName"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="审方机构：">
        <el-input v-model.trim="model.checkHospitalName"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label
                    label-width="0">
        <el-button type="primary"
                   v-on:click="get">搜 索</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column type="index"
                       width="80"
                       label="序号"
                       align="center"></el-table-column>
      <el-table-column min-width="180px"
                       label="处方来源机构"
                       prop="hospitalName">
        <template slot-scope="scope">{{scope.row.hospitalName=="" ? "——": scope.row.hospitalName }}</template>
      </el-table-column>
      <el-table-column width="260px"
                       label="审方机构"
                       prop="hospitalName"></el-table-column>
      <el-table-column min-width="100px"
                       label="审方方案数目"
                       prop="linkman"></el-table-column>
      <el-table-column min-width="180px"
                       align="center"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="toDetail(scope.row)">审方团队</el-button>
          <el-button type="text">审方方案</el-button>
        </template>
      </el-table-column>
    </PeaceTable>

    <el-dialog v-if="detailDialog.visible"
               width="480px"
               v-bind:visible.sync="detailDialog.visible"
               title="审方团队配置">
      <ReviewDetail v-bind:data="detailDialog.data"
                    v-on:on-close="onClose"></ReviewDetail>
    </el-dialog>
  </div>
</template>

<script>
import ReviewDetail from './components/ReviewDetail'
import Service from './service'

export default {
  components: {
    ReviewDetail
  },
  data() {
    return {
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

  methods: {
    get() {
      const fetch = Service.getList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    // 基本信息
    toDetail(row) {
      row = ['1', '2', '3']
      this.detailDialog.visible = true
      this.detailDialog.data = row
    },

    onClose() {
      this.detailDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>