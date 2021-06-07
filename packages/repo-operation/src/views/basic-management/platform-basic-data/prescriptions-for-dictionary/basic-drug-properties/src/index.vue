<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="药品名称">
          <el-input v-model.trim="model.drugName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <PeaceDatePicker type="daterange"
                           v-model="pickDate"
                           value-format="yyyy-MM-dd"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="平台药品编码"
                          width="200px"
                          prop="platformDrugCode">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          show-overflow-tooltip
                          prop="drugName">
        </PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          show-overflow-tooltip
                          prop="drugSpecifications">
          <template slot-scope="scope">
            {{scope.row.drugSpecifications||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          show-overflow-tooltip
                          prop="enterpriseCnName">
          <template slot-scope="scope">
            {{scope.row.enterpriseCnName||"——"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="基药"
                          width="100px">
          <template slot-scope="scope">
            {{scope.row.isBaseDrug == "yes" ? '是' : '否'}}
            <el-switch v-model="scope.row.isBaseDrug"
                       active-value="yes"
                       inactive-value="no"
                       @change="changeStatus(scope.row)"></el-switch>

          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          width="200px"
                          prop="updateTime">
        </PeaceTableColumn>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'BasicDrugProperties',

  data() {
    return {
      model: {
        drugName: '',
        beginTime: '',
        endTime: ''
      },
      pickDate: []
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  watch: {
    pickDate(value) {
      this.model.beginTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },

  methods: {
    get() {
      const fetch = Service.getPageBaseDrugProperties
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    changeStatus(row) {
      const params = {
        id: row.id,
        isBaseDrug: row.isBaseDrug
      }
      Service.updateBaseDrugProperties(params)
        .then((res) => {
          Peace.util.success(res.message)
          this.get()
        })
        .catch(() => {
          row.isBaseDrug = row.isBaseDrug == 'yes' ? 'no' : 'yes'
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
