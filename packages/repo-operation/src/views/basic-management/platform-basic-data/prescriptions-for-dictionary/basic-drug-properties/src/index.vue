<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="药品名称">
          <el-input v-model.trim="model.hospitalName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <PeaceDatePicker type="daterange"
                           v-model="model.pickDate"
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
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="orderNumber">
        </PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="hospitalName">
        </PeaceTableColumn>
        <PeaceTableColumn label="基药">
          <template slot-scope="scope">
            {{scope.row.enableStatus ? '是':'否'}}
            <el-switch v-model="scope.row.enableStatus"
                       @change="changeStatus(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="hospitalName">
        </PeaceTableColumn>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BasicDrugProperties',

  data() {
    return {
      model: {
        hospitalName: '',
        orgType: '',
        serviceType: []
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {},

    changeStatus(row) {
      console.log(row)
      // const params = {
      //   id: row.id,
      //   enableStatus: row.enableStatus
      // }
      // Service.updateStatus(params)
      //   .then((res) => {
      //     Peace.util.success(res.msg)
      //     this.get()
      //   })
      //   .catch(() => {
      //     row.enableStatus = !row.enableStatus
      //   })
    }
  }
}
</script>

<style lang="scss" scoped></style>
